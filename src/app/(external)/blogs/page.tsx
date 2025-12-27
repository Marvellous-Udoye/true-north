import { BlogHeroSection } from "./_components/blog-hero-section";
import { BlogSubscribeSection } from "./_components/blog-subscribe-section";
import { BlogsMainSection } from "./_components/blogs-main-section";

export default function BlogsPage() {
  return (
    <main>
      <BlogHeroSection />
      <BlogSubscribeSection />
      <BlogsMainSection />
    </main>
  );
}
