"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { BlogEditor } from "@/components/editor/blog-editor";

type BlogFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image_url: string;
  status: "draft" | "published";
};

const emptyForm: BlogFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  cover_image_url: "",
  status: "draft",
};

type BlogFormProps = {
  blogId?: string;
};

export function BlogForm({ blogId }: BlogFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<BlogFormValues>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!!blogId);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleChange = (field: keyof BlogFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!blogId) return;
    const fetchBlog = async () => {
      const supabase = supabaseBrowserClient();
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", blogId)
        .single();

      if (error || !data) {
        toast.error("Unable to load blog.");
        setIsLoading(false);
        return;
      }

      setForm({
        title: data.title ?? "",
        slug: data.slug ?? "",
        excerpt: data.excerpt ?? "",
        content: data.content ?? "",
        category: data.category ?? "",
        cover_image_url: data.cover_image_url ?? "",
        status: data.status ?? "draft",
      });
      setIsLoading(false);
    };

    fetchBlog();
  }, [blogId]);

  const handleSubmit = async (
    event?: React.FormEvent<HTMLFormElement>,
    nextStatus?: BlogFormValues["status"]
  ) => {
    event?.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = supabaseBrowserClient();
      const status = nextStatus ?? form.status;
      const payload = {
        ...form,
        status,
        published_at: status === "published" ? new Date().toISOString() : null,
      };

      if (blogId) {
        const { error } = await supabase
          .from("blogs")
          .update(payload)
          .eq("id", blogId);
        if (error) throw error;
        toast.success("Blog updated.");
      } else {
        const { error } = await supabase.from("blogs").insert(payload);
        if (error) throw error;
        toast.success(status === "draft" ? "Draft saved." : "Blog created.");
      }
      router.push("/dashboard/blogs");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save blog.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || "Upload failed.");
      }
      handleChange("cover_image_url", payload.url);
      toast.success("Image uploaded.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed.";
      toast.error(message);
    } finally {
      setUploadingImage(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-primary/10 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="space-y-3">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
            <div className="space-y-3 rounded-xl border border-dashed border-primary/20 bg-white p-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-9 w-24" />
              </div>
              <Skeleton className="h-40 w-full rounded-lg" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/10 bg-white">
          <div className="flex flex-wrap items-center gap-2 border-b border-primary/10 p-3">
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-8" />
            ))}
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-12" />
          </div>
          <div className="space-y-4 p-6">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-64 w-full" />
          </div>
          <div className="border-t border-primary/10 p-3">
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BlogEditor
        content={form.content}
        onChange={(value) => handleChange("content", value)}
        category={form.category}
        onCategoryChange={(value) => handleChange("category", value)}
        title={form.title}
        slug={form.slug}
        excerpt={form.excerpt}
        coverImageUrl={form.cover_image_url}
        uploadingImage={uploadingImage}
        isEditing={Boolean(blogId)}
        isSubmitting={isSubmitting}
        onTitleChange={(value) => handleChange("title", value)}
        onSlugChange={(value) => handleChange("slug", value)}
        onExcerptChange={(value) => handleChange("excerpt", value)}
        onUploadImage={handleImageUpload}
        onSaveDraft={() => handleSubmit(undefined, "draft")}
        onPublish={() => handleSubmit(undefined, "published")}
        onSaveChanges={
          blogId ? () => handleSubmit(undefined, form.status) : undefined
        }
      />
    </div>
  );
}
