import { BlogForm } from "../../_components/blog-form";

export default async function DashboardEditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogForm blogId={id} />;
}
