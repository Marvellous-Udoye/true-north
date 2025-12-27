"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Bold, Italic, Redo, Undo, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import Image from "next/image";

type BlogFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  cover_image_url: string;
  status: "draft" | "published";
};

const emptyForm: BlogFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  author: "",
  cover_image_url: "",
  status: "draft",
};

type BlogFormProps = {
  blogId?: string;
};

export function BlogForm({ blogId }: BlogFormProps) {
  const [form, setForm] = useState<BlogFormValues>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!!blogId);
  const [uploadingImage, setUploadingImage] = useState(false);

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
        author: data.author ?? "",
        cover_image_url: data.cover_image_url ?? "",
        status: data.status ?? "draft",
      });
      setIsLoading(false);
    };

    fetchBlog();
  }, [blogId]);

  const handleChange = (field: keyof BlogFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = supabaseBrowserClient();
      const payload = {
        ...form,
        published_at: form.status === "published" ? new Date().toISOString() : null,
      };

      if (blogId) {
        const { error } = await supabase.from("blogs").update(payload).eq("id", blogId);
        if (error) throw error;
        toast.success("Blog updated.");
      } else {
        const { error } = await supabase.from("blogs").insert(payload);
        if (error) throw error;
        toast.success("Blog created.");
        setForm(emptyForm);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save blog.";
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
      <Card>
        <CardHeader>
          <CardTitle>Loading blog...</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-4 w-1/2 rounded bg-primary/10" />
          <div className="h-10 w-full rounded bg-primary/10" />
          <div className="h-24 w-full rounded bg-primary/10" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{blogId ? "Edit blog" : "Create new blog"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <Input
            value={form.title}
            onChange={(event) => handleChange("title", event.target.value)}
            placeholder="Blog title"
            required
          />
          <Input
            value={form.slug}
            onChange={(event) => handleChange("slug", event.target.value)}
            placeholder="Slug (e.g. modern-marketing-insights)"
            required
          />
          <div className="space-y-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">Cover image</p>
                <p className="text-xs text-muted-foreground">
                  Upload a hero image that appears on the blog card.
                </p>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-primary/10 px-4 py-2 text-xs font-semibold text-primary transition hover:border-primary/30">
                <UploadCloud className="h-4 w-4" />
                {uploadingImage ? "Uploading..." : "Upload image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      handleImageUpload(file);
                    }
                  }}
                  disabled={uploadingImage}
                />
              </label>
            </div>
            {form.cover_image_url ? (
              <div className="overflow-hidden rounded-2xl border border-primary/10">
                <Image
                  src={form.cover_image_url}
                  alt="Cover preview"
                  fill
                  className="h-48 w-full object-cover"
                />
              </div>
            ) : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              value={form.category}
              onChange={(event) => handleChange("category", event.target.value)}
              placeholder="Category"
            />
            <Input
              value={form.author}
              onChange={(event) => handleChange("author", event.target.value)}
              placeholder="Author"
            />
          </div>
          <Textarea
            value={form.excerpt}
            onChange={(event) => handleChange("excerpt", event.target.value)}
            placeholder="Excerpt"
          />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => document.execCommand("bold")}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => document.execCommand("italic")}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => document.execCommand("undo")}
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => document.execCommand("redo")}
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
            <div
              contentEditable
              className="min-h-[240px] rounded-md border border-primary/10 bg-white px-3 py-2 text-sm text-primary shadow-sm outline-none focus:border-[#EE4312]"
              onInput={(event) =>
                handleChange("content", (event.target as HTMLDivElement).innerHTML)
              }
              dangerouslySetInnerHTML={{ __html: form.content }}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleChange("status", "draft")}
            >
              Save as draft
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleChange("status", "published")}
            >
              Set as published
            </Button>
            <Button
              type="submit"
              className="bg-[#EE4312] text-white hover:bg-[#cf3a10]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
