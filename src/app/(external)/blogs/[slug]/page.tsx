"use client";

import { useEffect, useState, use } from "react";
import { Badge } from "@/components/ui/badge";
import { SubscribeForm } from "@/components/subscribe-form";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ChevronLeft, 
  Clock, 
  Share2, 
  Bookmark,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: postSlug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [morePosts, setMorePosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchData = async () => {
      const decodedSlug = decodeURIComponent(postSlug);
      const supabase = supabaseBrowserClient();

      const { data: postData } = await supabase
        .from("blogs")
        .select("*")
        .or(`slug.eq.${decodedSlug},title.eq.${decodedSlug}`)
        .eq("status", "published")
        .maybeSingle();

      if (postData) {
        setPost(postData);
        
        const { data: others } = await supabase
          .from("blogs")
          .select("*")
          .eq("status", "published")
          .neq("id", postData.id)
          .limit(3);
        
        setMorePosts(others ?? []);
      }
      setLoading(false);
    };

    fetchData();
  }, [postSlug]);

  if (loading) return null;
  if (!post) notFound();

  const postDate = post.published_at || post.created_at;
  const readTime = getReadTime(post.content, post.excerpt);

  return (
    <main className="bg-white min-h-screen">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 border-b border-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-1/4" />
        
        <div className="relative mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
          <Link
            href="/blogs"
            className="group inline-flex items-center text-sm font-bold text-slate-400 hover:text-primary transition-colors mb-10"
          >
            <ChevronLeft className="mr-1 size-4 transition-transform group-hover:-translate-x-1" />
            Back to Insights
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1fr_450px] items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-primary/5 text-primary border-none font-bold uppercase text-[10px] tracking-widest px-3 py-1">
                  {post.category || "Insights"}
                </Badge>
                <div className="size-1 rounded-full bg-slate-200" />
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <Clock className="size-3.5" />
                  {readTime} min read
                </div>
              </div>

              <h1 className="text-4xl font-extrabold leading-[1.1] text-slate-900 md:text-5xl lg:text-7xl tracking-tight">
                {post.title}
              </h1>

              <p className="text-xl text-slate-500 leading-relaxed max-w-2xl italic font-serif">
                &ldquo;{post.excerpt}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-4">
                <div className="size-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <TrendingUp className="size-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Published on</p>
                  <p className="text-sm font-bold text-slate-900">
                    {postDate ? new Date(postDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Recently"}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-[3rem] shadow-2xl shadow-primary/10 border-8 border-white">
                <Image
                  src={post.cover_image_url || fallbackImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
          <div className="grid gap-16 lg:grid-cols-[1fr_350px]">
            {/* Left: Article Body */}
            <article className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-strong:text-slate-900 prose-img:rounded-[2.5rem]">
              <div
                className="blog-content reactjs-tiptap-editor-theme"
                dangerouslySetInnerHTML={{
                  __html: post.content || "<p>Preparing insights...</p>",
                }}
              />
            </article>

            {/* Right: Sidebar */}
            <aside className="space-y-12">
              {/* Share & Actions */}
              <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 sticky top-24">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Enjoying this?</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full h-12 rounded-2xl border-slate-200 justify-start gap-3 text-slate-600 hover:bg-white transition-all">
                    <Share2 className="size-4" />
                    Share article
                  </Button>
                  <Button variant="outline" className="w-full h-12 rounded-2xl border-slate-200 justify-start gap-3 text-slate-600 hover:bg-white transition-all">
                    <Bookmark className="size-4" />
                    Save for later
                  </Button>
                </div>

                <div className="mt-10 pt-10 border-t border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-4">Join our community</h4>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    Get the latest talent advisory insights and executive recruitment strategies delivered weekly.
                  </p>
                  <SubscribeForm className="w-full" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-900">More Insights</h2>
            <Button variant="link" className="text-primary font-bold" asChild>
              <Link href="/blogs">View all articles →</Link>
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {morePosts.map((article) => (
              <Link key={article.id} href={`/blogs/${article.slug}`} className="group">
                <div className="space-y-6">
                  <div className="aspect-[16/10] relative overflow-hidden rounded-[2.5rem] shadow-lg shadow-primary/5 transition-transform duration-500 group-hover:-translate-y-2">
                    <Image
                      src={article.cover_image_url || fallbackImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/5" />
                  </div>
                  <div className="space-y-3 px-2">
                    <Badge variant="secondary" className="bg-white/80 backdrop-blur-md text-primary border-none font-bold uppercase text-[10px] tracking-widest px-3 py-1">
                      {article.category || "Insights"}
                    </Badge>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest pt-2">
                      <span>{new Date(article.published_at || article.created_at || "").toLocaleDateString()}</span>
                      <span className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read Now
                        <ArrowRight className="size-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
