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

export async function incrementViewCount(slug: string): Promise<number> {
  if (!isSupabaseConfigured()) {
    return 0;
  }

  try {
    // Try RPC function for atomic increment (single database call)
    // Add timeout by using Promise.race
    const rpcPromise = supabase.rpc("increment_view_count", {
      post_slug: slug,
    });
    
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), 2000)
    );

    const rpcResult = await Promise.race([rpcPromise, timeoutPromise]);

    // If RPC succeeded, return the count
    if (!rpcResult.error && rpcResult.data !== null) {
      return rpcResult.data;
    }

    // Fallback to SELECT+UPDATE method
    const { data: existingData } = await supabase
      .from("views")
      .select("view_count")
      .eq("slug", slug)
      .single();

    if (existingData) {
      // Update existing record
      const newCount = (existingData.view_count || 0) + 1;
      await supabase
        .from("views")
        .update({ view_count: newCount })
        .eq("slug", slug);
      return newCount;
    }

    // Insert new record
    await supabase.from("views").insert({ slug, view_count: 1 });
    return 1;
  } catch (error) {
    // Silent fail - don't block page rendering for view counts
    if (process.env.NODE_ENV === "development") {
      console.warn("View count failed:", error);
    }
    return 0;
  }
}
