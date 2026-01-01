"use client";

import type { Editor } from "@tiptap/react";
import { Check, Moon, Sun, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { themeActions } from "reactjs-tiptap-editor/theme";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useLocalStorageState from "@/hooks/use-local-storage-state";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";

type ThemeMode = "light" | "dark";
type ThemeColor =
  | "default"
  | "blue"
  | "green"
  | "orange"
  | "red"
  | "violet"
  | "yellow"
  | "rose";

type HeaderProps = {
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  uploadingImage: boolean;
  isEditing: boolean;
  isSubmitting: boolean;
  onTitleChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onExcerptChange: (value: string) => void;
  onUploadImage: (file: File) => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  onSaveChanges?: () => void;
};

type NavBarProps = {
  editor: Editor | null;
  category: string;
  onCategoryChange: (value: string) => void;
};

const ColorIcon = ({ color, active }: { color: string; active: boolean }) => {
  if (active) {
    return (
      <span className="inline-flex size-5 items-center justify-center rounded-full bg-black">
        <Check size={16} className="text-white" />
      </span>
    );
  }

  return (
    <span
      className="inline-block size-5 rounded-full"
      style={{ backgroundColor: color }}
    />
  );
};

export function Header({
  title,
  slug,
  excerpt,
  coverImageUrl,
  uploadingImage,
  isEditing,
  isSubmitting,
  onTitleChange,
  onSlugChange,
  onExcerptChange,
  onUploadImage,
  onSaveDraft,
  onPublish,
  onSaveChanges,
}: HeaderProps) {
  const [theme, setTheme] = useLocalStorageState<ThemeMode>("tn-tiptap-theme", {
    defaultValue: "light",
  });
  const [color, setColor] = useLocalStorageState<ThemeColor>(
    "tn-tiptap-color",
    {
      defaultValue: "default",
    }
  );
  const [radius, setRadius] = useLocalStorageState<number>("tn-tiptap-radius", {
    defaultValue: 0.5,
  });

  useEffect(() => {
    themeActions.setTheme(theme || "light");
    themeActions.setColor(color || "default");
    themeActions.setBorderRadius(`${radius}rem` || "0.5rem");
  }, [theme, color, radius]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[24px] font-bold leading-tight tracking-tighter">
            Blog Editor
          </h2>
          <p className="text-sm text-muted-foreground">
            Craft and publish thoughtful insights for TrueNorth Talent Advisory.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={onSaveDraft} disabled={isSubmitting}>
            Save as draft
          </Button>
          <Button type="button" onClick={onPublish} disabled={isSubmitting}>
            Publish blog
          </Button>
          {isEditing && onSaveChanges ? (
            <Button
              type="button"
              variant="outline"
              onClick={onSaveChanges}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          ) : null}
          <Popover>
            {/* Not needed for now */}

            {/* <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <SwatchBook size={20} className="text-primary" />
              </Button>
            </PopoverTrigger> */}
            <PopoverContent align="end" className="w-90">
              <div className="mb-4">
                <Label className="text-[18px] font-semibold">Theme</Label>
              </div>

              <div className="mb-1">
                <Label>Color</Label>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-2">
                {[
                  { id: "default", label: "Default", color: "#000000" },
                  { id: "red", label: "Red", color: "#dc2626" },
                  { id: "blue", label: "Blue", color: "#2563eb" },
                  { id: "green", label: "Green", color: "#16a34a" },
                  { id: "orange", label: "Orange", color: "#f97316" },
                  { id: "rose", label: "Rose", color: "#e11d48" },
                ].map((item) => (
                  <Button
                    key={item.id}
                    variant="outline"
                    onClick={() => {
                      setColor(item.id as ThemeColor);
                      themeActions.setColor(item.id as ThemeColor);
                    }}
                    className={
                      color === item.id
                        ? "bg-accent text-accent-foreground"
                        : ""
                    }
                  >
                    <ColorIcon color={item.color} active={color === item.id} />
                    {item.label}
                  </Button>
                ))}
              </div>

              <div className="mb-1">
                <Label>Radius</Label>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {[0, 0.25, 0.5, 0.75, 1].map((value) => (
                  <Button
                    key={value}
                    variant="outline"
                    onClick={() => {
                      setRadius(value);
                      themeActions.setBorderRadius(`${value}rem`);
                    }}
                    className={
                      radius === value ? "bg-accent text-accent-foreground" : ""
                    }
                  >
                    {value}rem
                  </Button>
                ))}
              </div>

              <div className="mb-1">
                <Label>Theme</Label>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setTheme("light");
                    themeActions.setTheme("light");
                  }}
                  className={
                    theme === "light" ? "bg-accent text-accent-foreground" : ""
                  }
                >
                  <Sun size={16} />
                  Light
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setTheme("dark");
                    themeActions.setTheme("dark");
                  }}
                  className={
                    theme === "dark" ? "bg-accent text-accent-foreground" : ""
                  }
                >
                  <Moon size={16} />
                  Dark
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="grid gap-2 ">
              <Label>Blog title</Label>
              <Input
                value={title}
                onChange={(event) => onTitleChange(event.target.value)}
                placeholder="Strategic Partnerships That Actually Move Revenue"
                autoComplete="off"
              />
            </div>
            <div className="grid gap-2 ">
              <Label>Slug</Label>
              <Input
                value={slug}
                onChange={(event) => onSlugChange(event.target.value)}
                placeholder="strategic-partnerships-that-move-revenue"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="grid gap-2 ">
            <Label>Excerpt</Label>
            <Textarea
              value={excerpt}
              onChange={(event) => onExcerptChange(event.target.value)}
              placeholder="Summarize this post for readers and search results."
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-dashed border-primary/20 bg-white p-3">
          <div className="flex items-center justify-between">
            <Label>Thumbnail</Label>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-primary/10 px-3 py-2 text-xs font-semibold text-primary transition hover:border-primary/30">
              <UploadCloud className="h-4 w-4" />
              {uploadingImage ? "Uploading..." : "Upload"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    onUploadImage(file);
                  }
                }}
                disabled={uploadingImage}
              />
            </label>
          </div>
          {coverImageUrl ? (
            <div className="relative h-40 overflow-hidden rounded-lg border border-primary/10">
              <Image
                src={coverImageUrl}
                alt="Blog thumbnail"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-lg border border-primary/10 bg-primary/5 text-xs text-muted-foreground">
              No image selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function NavBar({ editor, category, onCategoryChange }: NavBarProps) {
  const [editorEditable, setEditorEditable] = useLocalStorageState(
    "tn-tiptap-editable",
    {
      defaultValue: true,
    }
  );

  useEffect(() => {
    if (!editor) return;
    const syncEditable = () => setEditorEditable(editor.isEditable);
    editor.on("update", syncEditable);
    return () => {
      editor.off("update", syncEditable);
    };
  }, [editor, setEditorEditable]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="max-w-55">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {BLOG_CATEGORIES.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={() => {
          editor?.setEditable(!editorEditable);
          setEditorEditable(!editorEditable);
        }}
      >
        {editorEditable ? "Readonly" : "Editable"}
      </Button>
    </div>
  );
}
