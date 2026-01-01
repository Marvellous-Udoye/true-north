"use client";

import { useCallback, useEffect, useMemo } from "react";
import { RichTextProvider } from "reactjs-tiptap-editor";
import { EditorContent, useEditor } from "@tiptap/react";
import { CharacterCount } from "@tiptap/extensions";
import { Document } from "@tiptap/extension-document";
import { HardBreak } from "@tiptap/extension-hard-break";
import { ListItem } from "@tiptap/extension-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";
import { TextStyle } from "@tiptap/extension-text-style";
import {
  Dropcursor,
  Gapcursor,
  Placeholder,
  TrailingNode,
} from "@tiptap/extensions";

import {
  Attachment,
  RichTextAttachment,
} from "reactjs-tiptap-editor/attachment";
import {
  Blockquote,
  RichTextBlockquote,
} from "reactjs-tiptap-editor/blockquote";
import { Bold, RichTextBold } from "reactjs-tiptap-editor/bold";
import {
  BulletList,
  RichTextBulletList,
} from "reactjs-tiptap-editor/bulletlist";
import { Clear, RichTextClear } from "reactjs-tiptap-editor/clear";
import { Code, RichTextCode } from "reactjs-tiptap-editor/code";
import { CodeBlock, RichTextCodeBlock } from "reactjs-tiptap-editor/codeblock";
import { CodeView, RichTextCodeView } from "reactjs-tiptap-editor/codeview";
import { Color, RichTextColor } from "reactjs-tiptap-editor/color";
import {
  Column,
  ColumnNode,
  MultipleColumnNode,
  RichTextColumn,
} from "reactjs-tiptap-editor/column";
import { Drawer, RichTextDrawer } from "reactjs-tiptap-editor/drawer";
import { Emoji, RichTextEmoji } from "reactjs-tiptap-editor/emoji";
import { ExportPdf, RichTextExportPdf } from "reactjs-tiptap-editor/exportpdf";
import {
  ExportWord,
  RichTextExportWord,
} from "reactjs-tiptap-editor/exportword";
import {
  FontFamily,
  RichTextFontFamily,
} from "reactjs-tiptap-editor/fontfamily";
import { FontSize, RichTextFontSize } from "reactjs-tiptap-editor/fontsize";
import { Heading, RichTextHeading } from "reactjs-tiptap-editor/heading";
import { Highlight, RichTextHighlight } from "reactjs-tiptap-editor/highlight";
import {
  History,
  RichTextRedo,
  RichTextUndo,
} from "reactjs-tiptap-editor/history";
import {
  HorizontalRule,
  RichTextHorizontalRule,
} from "reactjs-tiptap-editor/horizontalrule";
import { Iframe, RichTextIframe } from "reactjs-tiptap-editor/iframe";
import { Image, RichTextImage } from "reactjs-tiptap-editor/image";
import { ImageGif, RichTextImageGif } from "reactjs-tiptap-editor/imagegif";
import {
  ImportWord,
  RichTextImportWord,
} from "reactjs-tiptap-editor/importword";
import { Indent, RichTextIndent } from "reactjs-tiptap-editor/indent";
import { Italic, RichTextItalic } from "reactjs-tiptap-editor/italic";
import { Katex, RichTextKatex } from "reactjs-tiptap-editor/katex";
import {
  LineHeight,
  RichTextLineHeight,
} from "reactjs-tiptap-editor/lineheight";
import { Link, RichTextLink } from "reactjs-tiptap-editor/link";
import { Mention } from "reactjs-tiptap-editor/mention";
import { Mermaid, RichTextMermaid } from "reactjs-tiptap-editor/mermaid";
import { MoreMark, RichTextMoreMark } from "reactjs-tiptap-editor/moremark";
import {
  OrderedList,
  RichTextOrderedList,
} from "reactjs-tiptap-editor/orderedlist";
import {
  RichTextSearchAndReplace,
  SearchAndReplace,
} from "reactjs-tiptap-editor/searchandreplace";
import { RichTextStrike, Strike } from "reactjs-tiptap-editor/strike";
import { RichTextTable, Table } from "reactjs-tiptap-editor/table";
import { RichTextTaskList, TaskList } from "reactjs-tiptap-editor/tasklist";
import { RichTextAlign, TextAlign } from "reactjs-tiptap-editor/textalign";
import {
  RichTextTextDirection,
  TextDirection,
} from "reactjs-tiptap-editor/textdirection";
import {
  RichTextUnderline,
  TextUnderline,
} from "reactjs-tiptap-editor/textunderline";
import { RichTextTwitter, Twitter } from "reactjs-tiptap-editor/twitter";
import { RichTextVideo, Video } from "reactjs-tiptap-editor/video";
import {
  SlashCommand,
  SlashCommandList,
} from "reactjs-tiptap-editor/slashcommand";

import {
  RichTextBubbleColumns,
  RichTextBubbleDrawer,
  RichTextBubbleIframe,
  RichTextBubbleImage,
  RichTextBubbleImageGif,
  RichTextBubbleKatex,
  RichTextBubbleLink,
  RichTextBubbleMermaid,
  RichTextBubbleTable,
  RichTextBubbleText,
  RichTextBubbleTwitter,
  RichTextBubbleVideo,
  RichTextBubbleMenuDragHandle,
} from "reactjs-tiptap-editor/bubble";

import "reactjs-tiptap-editor/style.css";

import { Header, NavBar } from "@/components/editor/editor-header";
import { Count } from "@/components/editor/extension/Count";

type BlogEditorProps = {
  content: string;
  onChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
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

function convertBase64ToBlob(base64: string) {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] ?? "application/octet-stream";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const DocumentColumn = Document.extend({
  content: "(block|columns)+",
});

const MOCK_USERS = [
  {
    id: "0",
    label: "truenorth_editorial",
    avatar: {
      src: "https://avatars.githubusercontent.com/u/42096908?v=4",
    },
  },
];

const LIMIT = 2500;

function debounce<T extends (...args: never[]) => void>(func: T, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function BlogEditor({
  content,
  onChange,
  category,
  onCategoryChange,
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
}: BlogEditorProps) {
  const onValueChange = useMemo(
    () =>
      debounce((value: string) => {
        onChange(value);
      }, 300),
    [onChange]
  );

  const uploadFile = useCallback(async (file: File) => {
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
    return payload.url as string;
  }, []);

  const extensions = useMemo(
    () => [
      DocumentColumn,
      Text,
      Dropcursor.configure({
        class: "reactjs-tiptap-editor-theme",
        color: "hsl(var(--primary))",
        width: 2,
      }),
      Gapcursor,
      HardBreak,
      Paragraph,
      TrailingNode,
      ListItem,
      TextStyle,
      Placeholder.configure({
        placeholder: "Press '/' for commands",
      }),
      CharacterCount.configure({
        limit: LIMIT,
      }),
      History,
      SearchAndReplace,
      Clear,
      FontFamily,
      Heading,
      FontSize,
      Bold,
      Italic,
      TextUnderline,
      Strike,
      MoreMark,
      Emoji,
      Color,
      Highlight,
      BulletList,
      OrderedList,
      TextAlign,
      Indent,
      LineHeight,
      TaskList,
      Link,
      Image.configure({
        resourceImage: "upload",
        enableAlt: false,
        multiple: false,
        upload: async (file: File) => {
          const url = await uploadFile(file);
          return url;
        },
      }),
      Video.configure({
        resourceVideo: "upload",
        upload: async (file: File) => {
          const url = await uploadFile(file);
          return url;
        },
      }),
      ImageGif.configure({
        provider: "giphy",
        API_KEY: process.env.NEXT_PUBLIC_GIPHY_API_KEY as string,
      }),
      Blockquote,
      HorizontalRule,
      Code,
      CodeBlock,
      Column,
      ColumnNode,
      MultipleColumnNode,
      Table,
      Iframe,
      ExportPdf,
      ImportWord,
      ExportWord,
      TextDirection,
      Attachment.configure({
        upload: (file: File) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          return new Promise((resolve) => {
            setTimeout(() => {
              const blob = convertBase64ToBlob(reader.result as string);
              resolve(URL.createObjectURL(blob));
            }, 300);
          });
        },
      }),
      Katex,
      Mermaid.configure({
        upload: (file: File) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          return new Promise((resolve) => {
            setTimeout(() => {
              const blob = convertBase64ToBlob(reader.result as string);
              resolve(URL.createObjectURL(blob));
            }, 300);
          });
        },
      }),
      Drawer.configure({
        upload: (file: File) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          return new Promise((resolve) => {
            setTimeout(() => {
              const blob = convertBase64ToBlob(reader.result as string);
              resolve(URL.createObjectURL(blob));
            }, 300);
          });
        },
      }),
      Twitter,
      Mention.configure({
        suggestions: [
          {
            char: "@",
            items: async ({ query }: { query: string }) => {
              return MOCK_USERS.filter((item) =>
                item.label.toLowerCase().startsWith(query.toLowerCase())
              );
            },
          },
          {
            char: "#",
            items: async ({ query }: { query: string }) => {
              return MOCK_USERS.filter((item) =>
                item.label.toLowerCase().startsWith(query.toLowerCase())
              );
            },
          },
        ],
      }),
      SlashCommand,
      CodeView,
    ],
    [uploadFile]
  );

  const editor = useEditor({
    textDirection: "auto",
    content,
    extensions,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onValueChange(html);
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (current !== content) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [editor, content]);

  return (
    <>
      <div className="border-b border-border bg-white rounded-xl shadow-sm">
        <div className="mx-auto w-full max-w-300 p-4 sm:p-6">
          <Header
            title={title}
            slug={slug}
            excerpt={excerpt}
            coverImageUrl={coverImageUrl}
            uploadingImage={uploadingImage}
            isEditing={isEditing}
            isSubmitting={isSubmitting}
            onTitleChange={onTitleChange}
            onSlugChange={onSlugChange}
            onExcerptChange={onExcerptChange}
            onUploadImage={onUploadImage}
            onSaveDraft={onSaveDraft}
            onPublish={onPublish}
            onSaveChanges={onSaveChanges}
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-300 p-4 sm:p-6 bg-white rounded-xl shadow-sm border">
        <NavBar
          editor={editor}
          category={category}
          onCategoryChange={onCategoryChange}
        />
        {editor ? (
          <RichTextProvider editor={editor}>
            <div className="overflow-hidden rounded-xl border border-border bg-background">
              <div className="flex max-h-full w-full flex-col">
                <div className="flex flex-wrap items-center gap-2 border-b border-border p-2">
                  <RichTextUndo />
                  <RichTextRedo />
                  <RichTextSearchAndReplace />
                  <RichTextClear />
                  <RichTextFontFamily />
                  <RichTextHeading />
                  <RichTextFontSize />
                  <RichTextBold />
                  <RichTextItalic />
                  <RichTextUnderline />
                  <RichTextStrike />
                  <RichTextMoreMark />
                  <RichTextEmoji />
                  <RichTextColor />
                  <RichTextHighlight />
                  <RichTextBulletList />
                  <RichTextOrderedList />
                  <RichTextAlign />
                  <RichTextIndent />
                  <RichTextLineHeight />
                  <RichTextTaskList />
                  <RichTextLink />
                  <RichTextImage />
                  <RichTextVideo />
                  <RichTextImageGif />
                  <RichTextBlockquote />
                  <RichTextHorizontalRule />
                  <RichTextCode />
                  <RichTextCodeBlock />
                  <RichTextColumn />
                  <RichTextTable />
                  <RichTextIframe />
                  <RichTextExportPdf />
                  <RichTextImportWord />
                  <RichTextExportWord />
                  <RichTextTextDirection />
                  <RichTextAttachment />
                  <RichTextKatex />
                  <RichTextMermaid />
                  <RichTextDrawer />
                  <RichTextTwitter />
                  <RichTextCodeView />
                </div>

                <EditorContent editor={editor} />

                <RichTextBubbleColumns />
                <RichTextBubbleDrawer />
                <RichTextBubbleIframe />
                <RichTextBubbleKatex />
                <RichTextBubbleLink />

                <RichTextBubbleImage />
                <RichTextBubbleVideo />
                <RichTextBubbleImageGif />

                <RichTextBubbleMermaid />
                <RichTextBubbleTable />
                <RichTextBubbleText />
                <RichTextBubbleTwitter />

                <SlashCommandList />
                <RichTextBubbleMenuDragHandle />
              </div>

              <Count editor={editor} limit={LIMIT} />
            </div>
          </RichTextProvider>
        ) : (
          <div className="rounded-xl border border-dashed border-primary/10 bg-white p-8 text-sm text-muted-foreground">
            Loading editor...
          </div>
        )}
      </div>
    </>
  );
}
