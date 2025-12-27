"use client";

import { BlogForm } from "../../_components/blog-form";

export default function DashboardEditBlogPage({ params }: { params: { id: string } }) {
  return <BlogForm blogId={params.id} />;
}
