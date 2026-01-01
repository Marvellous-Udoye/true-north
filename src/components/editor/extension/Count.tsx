"use client";

import { type Editor, useEditorState } from "@tiptap/react";

import "./style.css";

type CountProps = {
  editor: Editor | null;
  limit: number;  
};

export function Count({ editor, limit }: CountProps) {
  const stats = useEditorState({
    editor,
    selector: (context) => ({
      charactersCount: context.editor
        ? context.editor.storage.characterCount.characters()
        : 0,
      wordsCount: context.editor
        ? context.editor.storage.characterCount.words()
        : 0,
    }),
  });

  if (!editor || !stats) {
    return null;
  }

  const { charactersCount, wordsCount } = stats;

  const percentage = Math.round((100 / limit) * charactersCount);

  return (
    <div
      className={`character-count border-t border-border p-3 ${
        charactersCount === limit ? "character-count--warning" : ""
      }`}
    >
      <svg height="20" width="20" viewBox="0 0 20 20">
        <circle r="10" cx="10" cy="10" fill="#e9ecef" />
        <circle
          r="5"
          cx="10"
          cy="10"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
          transform="rotate(-90) translate(-20)"
        />
        <circle r="6" cx="10" cy="10" fill="white" />
      </svg>
      {charactersCount} / {limit} characters
      <br />
      {wordsCount} words
    </div>
  );
}
