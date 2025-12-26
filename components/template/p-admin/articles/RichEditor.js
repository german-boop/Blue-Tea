"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichEditor({ value, onChange }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        immediatelyRender: false,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    return (
        <>
            <div className="d-flex gap-1" style={{ marginBottom: "10px" }}>
                <button type="button" className="edit" onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
                <button type="button" className="edit" onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
                <button type="button" className="edit" onClick={() => editor.chain().focus().toggleStrike().run()}>S</button>
                <button type="button" className="edit" onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
            </div>
            <EditorContent editor={editor} className="richEditor" />
        </>
    )
}
