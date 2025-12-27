import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/lib/blog-data";

const otherArticles = [
  {
    slug: "tech-innovations-business",
    title: "Tech Innovations Redefining the Business Landscape",
    category: "Information Technology",
    date: "December 20th, 2023",
  },
  {
    slug: "financial-stewardship-principles",
    title: "Key Principles for Effective Financial Stewardship",
    category: "Financial",
    date: "December 22nd, 2023",
  },
  {
    slug: "contemporary-market-strategies",
    title: "Strategies for Conquering Contemporary Markets",
    category: "Marketing",
    date: "December 26th, 2023",
  },
  {
    slug: "design-industry-challenges",
    title: "Overcoming Challenges in the Design Industry",
    category: "Design",
    date: "December 28th, 2023",
  },
];

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const contentBlocks =
    post.content && post.content.length > 0
      ? post.content
      : [
          {
            heading: "What happen to modern marketing now?",
            body:
              "Discover the dynamic realm of modern marketing through our latest insights. In an era marked by technological evolution, our comprehensive analysis delves into groundbreaking strategies shaping the industry.",
          },
          {
            heading: "1. AI-Powered Personalization: The Next Frontier",
            body:
              "Artificial intelligence continues to be a driving force, with its applications in marketing becoming increasingly sophisticated. Our latest insights explore how AI is revolutionizing personalization strategies.",
          },
          {
            heading: "2. Rise of Virtual Events: Redefining Audience Engagement",
            body:
              "The global shift towards remote interactions has catalyzed the rise of virtual events. This segment explores how businesses are leveraging digital platforms to maximize reach.",
          },
          {
            heading: "3. Sustainable Marketing Practices: More Than a Trend",
            body:
              "Sustainability is no longer a peripheral concern. Learn how brands are integrating sustainable practices into their marketing strategies and messaging.",
          },
          {
            heading: "4. Shoppable Content: Seamless Path from Inspiration to Purchase",
            body:
              "Discover the strategies behind successful shoppable content and the integration of e-commerce into digital experiences.",
          },
          {
            heading: "5. Privacy-Centric Marketing in the Digital Age",
            body:
              "With increasing concerns about data privacy, learn how transparent practices can build trust and maintain engagement.",
          },
        ];

  return (
    <main className="bg-[#f7f9fc]">
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div
          className="pointer-events-none absolute right-10 top-6 h-24 w-48 opacity-60"
          style={{
            backgroundImage: "url('/assets/hero-dots.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right top",
          }}
          aria-hidden="true"
        />
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:px-10 lg:px-14">
          <h1 className="text-3xl font-bold text-primary md:text-4xl">
            {post.title}
          </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <Badge variant="accent">{post.category}</Badge>
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span>by {post.author}</span>
            </div>
          <div className="overflow-hidden rounded-3xl">
            <Image
              src={post.image}
              alt={post.title}
              width={900}
              height={480}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:px-10 lg:grid-cols-[2fr_1fr] lg:px-14">
          <Card className="rounded-3xl">
            <CardContent className="space-y-6 p-6 text-sm text-muted-foreground">
            {contentBlocks.map((section) => (
              <div key={section.heading} className="space-y-2">
                <h2 className="text-base font-semibold text-primary">
                  {section.heading}
                  </h2>
                  <p>{section.body}</p>
                </div>
              ))}
              <p>
                We continue to uncover the latest insights into modern marketing, our commitment is
                to provide a roadmap for businesses navigating this ever-evolving landscape.
              </p>
            </CardContent>
          </Card>

          <aside className="space-y-4">
            <h3 className="text-base font-semibold text-primary">Other Articles</h3>
            <Card className="rounded-3xl">
              <CardContent className="space-y-4 p-4">
                {otherArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blogs/${article.slug}`}
                    className="block rounded-2xl border border-primary/10 p-4 transition hover:border-primary/30"
                  >
                    <p className="text-sm font-semibold text-primary">{article.title}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span>{article.date}</span>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}
