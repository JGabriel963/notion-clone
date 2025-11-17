"use client";

import "@blocknote/core/fonts/inter.css";
import { PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (value: string) => void;
  initiaContent?: string;
  editable?: boolean;
}

export const Editor = ({
  onChange,
  initiaContent,
  editable = true,
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const uploadFile = async (file: File) => {
    const res = await edgestore.publicFiles.upload({
      file,
    });

    return res.url;
  };
  const editor = useCreateBlockNote({
    initialContent: initiaContent
      ? (JSON.parse(initiaContent) as PartialBlock[])
      : undefined,
    uploadFile,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      editable={editable}
      onChange={() => {
        onChange(JSON.stringify(editor.document, null, 2));
      }}
    />
  );
};
