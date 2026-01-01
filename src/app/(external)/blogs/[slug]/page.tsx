import { Badge } from "@/components/ui/badge";
import { SubscribeForm } from "@/components/subscribe-form";
import { supabaseServerClientReadonly } from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const fallbackImage = "/assets/hero-img.svg";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  cover_image_url: string | null;
  content: string | null;
  published_at: string | null;
  created_at: string | null;
};

const getReadTime = (content: string | null, excerpt: string | null) => {
  const text = (content || excerpt || "").replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 200));
};

const getTags = (post: BlogPost) => {
  const tags = [post.category, "Talent Advisory", "Leadership"].filter(
    (tag): tag is string => Boolean(tag)
  );
  return Array.from(new Set(tags)).slice(0, 4);
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  noStore();
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const supabase = supabaseServerClientReadonly();

  const slugFilter = decodedSlug.replace(/,/g, "\\,");
  const { data: post } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, excerpt, category, cover_image_url, content, published_at, created_at"
    )
    .or(`slug.eq.${slugFilter},title.eq.${slugFilter}`)
    .eq("status", "published")
    .maybeSingle();

  if (!post) {
    notFound();
  }

  const { data: morePosts } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, excerpt, category, cover_image_url, content, published_at, created_at"
    )
    .eq("status", "published")
    .neq("slug", decodedSlug)
    .order("published_at", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(3);

  const postDate = post.published_at || post.created_at;
  const readTime = getReadTime(post.content, post.excerpt);
  const tags = getTags(post);

  return (
    <main className="bg-white text-primary">
      <section className="relative min-h-130 overflow-hidden">
        <Image
          src={post.cover_image_url || fallbackImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/25 to-[#f7f9fc]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-white" />
      </section>

      <section className="pb-16 pt-10 md:pb-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <div className="mb-8 space-y-4">
            <div className="w-full">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  {post.category || "Insights"}
                </Badge>
                {postDate ? (
                  <span>{new Date(postDate).toLocaleDateString()}</span>
                ) : null}
                <span>{readTime} min read</span>
              </div>
              <h1 className="mt-3 text-2xl font-semibold leading-tight text-primary md:text-4xl">
                {post.title}
              </h1>
            </div>
            {post.excerpt ? (
              <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
                {post.excerpt}
              </p>
            ) : null}
          </div>
          <div
            className="blog-content reactjs-tiptap-editor-theme text-base leading-relaxed text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html:
                post.content ||
                "<p>We are preparing insights for this article. Please check back soon.</p>",
            }}
          />
          <div className="mt-10 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white px-4 py-2 text-xs text-muted-foreground shadow-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-4xl px-4 md:px-8 ">
          <div className="rounded-3xl bg-white px-6 py-10 text-center text-primary border shadow-sm md:px-10">
            <h2 className="text-2xl font-semibold">Enjoyed this article?</h2>
            <p className="mt-2 text-sm text-primary/70">
              Subscribe to receive more insights like this directly in your
              inbox.
            </p>
            <SubscribeForm className="mx-auto mt-6 max-w-md w-full" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f7f9fc]">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-2xl font-semibold">More articles</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {(morePosts ?? []).map((article) => {
              const articleDate = article.published_at || article.created_at;
              return (
                <Link
                  key={article.id}
                  href={`/blogs/${article.slug}`}
                  className="group h-full"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.cover_image_url || fallbackImage}
                        alt={article.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                      <Badge
                        variant="secondary"
                        className="absolute left-4 top-4 rounded-md px-3 py-1 bg-muted capitalize"
                      >
                        {article.category || "Insights"}
                      </Badge>
                    </div>
                    <div className="flex flex-1 flex-col space-y-3 px-5 pb-5 pt-4 text-primary">
                      <h3 className="text-base font-semibold">
                        {article.title}
                      </h3>
                      {article.excerpt ? (
                        <p className="text-base text-muted-foreground line-clamp-2">
                          {article.excerpt}
                        </p>
                      ) : null}
                      <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                        {articleDate ? (
                          <span>
                            {new Date(articleDate).toLocaleDateString()}
                          </span>
                        ) : (
                          <span>Recently added</span>
                        )}
                        <span className="font-semibold text-[#EE4312]">
                          Read More
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
