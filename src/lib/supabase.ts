import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !==
      "https://placeholder.supabase.co" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "placeholder-key"
  );
};

export interface ViewCount {
  slug: string;
  view_count: number;
}

export async function getViewCount(slug: string): Promise<number> {
  if (!isSupabaseConfigured()) {
    return 0;
  }

  try {
    const { data, error } = await supabase
      .from("views")
      .select("view_count")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return 0;
    }

    return data.view_count || 0;
  } catch {
    return 0;
  }
}

// Helper function to add timeout to promises
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeoutMs)
    ),
  ]);
}

export async function incrementViewCount(slug: string): Promise<number> {
  if (!isSupabaseConfigured()) {
    return 0;
  }

  try {
    // Use RPC function for atomic increment (single database call)
    // Fallback to SELECT+UPDATE if RPC doesn't exist
    const incrementPromise = supabase.rpc("increment_view_count", {
      post_slug: slug,
    });

    const { data, error } = await withTimeout(incrementPromise, 2000); // 2 second timeout

    if (error) {
      // Fallback to legacy method
      const { data: existingData } = await withTimeout(
        supabase.from("views").select("view_count").eq("slug", slug).single(),
        1000
      );

      if (existingData) {
        // Update existing record
        const newCount = (existingData.view_count || 0) + 1;
        await withTimeout(
          supabase
            .from("views")
            .update({ view_count: newCount })
            .eq("slug", slug),
          1000
        );
        return newCount;
      } else {
        // Insert new record
        await withTimeout(
          supabase.from("views").insert({ slug, view_count: 1 }),
          1000
        );
        return 1;
      }
    }

    return (data as number) || 1;
  } catch (error) {
    // Silent fail - don't block page rendering for view counts
    if (process.env.NODE_ENV === "development") {
      console.warn("View count failed:", error);
    }
    return 0;
  }
}
