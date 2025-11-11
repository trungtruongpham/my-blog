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
    // First, try to get the current count
    const { data: existingData } = await supabase
      .from("views")
      .select("view_count")
      .eq("slug", slug)
      .single();

    if (existingData) {
      // Update existing record
      const newCount = (existingData.view_count || 0) + 1;
      const { error } = await supabase
        .from("views")
        .update({ view_count: newCount })
        .eq("slug", slug);

      if (error) {
        console.error("Error updating view count:", error);
        return existingData.view_count || 0;
      }

      return newCount;
    } else {
      // Insert new record
      const { error } = await supabase
        .from("views")
        .insert({ slug, view_count: 1 });

      if (error) {
        console.error("Error inserting view count:", error);
        return 0;
      }

      return 1;
    }
  } catch {
    return 0;
  }
}
