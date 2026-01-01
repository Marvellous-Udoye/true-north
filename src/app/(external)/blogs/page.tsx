import { unstable_noStore as noStore } from "next/cache";
import { BlogHeroSection } from "./_components/blog-hero-section";
import { BlogSubscribeSection } from "./_components/blog-subscribe-section";
import { BlogsMainSection } from "./_components/blogs-main-section";
import { supabaseServerClientReadonly } from "@/lib/supabase/server";

export default async function BlogsPage() {
  noStore();
  const supabase = supabaseServerClientReadonly();
  const { data } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, excerpt, category, cover_image_url, content, published_at, created_at"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <main>
      <BlogHeroSection />
      <BlogSubscribeSection />
      <BlogsMainSection posts={data ?? []} />
    </main>
  );
}
