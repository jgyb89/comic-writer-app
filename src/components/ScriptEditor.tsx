import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ComicBlock } from './ComicBlockExtension';
import { useScriptStore } from '../store/scriptStore';

export const ScriptEditor: React.FC = () => {
  const script = useScriptStore(state => state.script);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false, // disable default paragraph to use ComicBlock
      }),
      ComicBlock,
    ],
    content: `
      <p data-type="PanelCue">PANEL 1</p>
      <p data-type="Action">An empty room.</p>
      <p data-type="Character">JOHN</p>
      <p data-type="Dialogue">Where is everyone?</p>
    `,
    onUpdate: ({ editor }) => {
      // Here you would synchronize editor content to the Zustand store.
      // For now, we'll leave this as a hook for the syncing logic.
      // e.g. converting editor.getJSON() to Script blocks
    }
  });

  return (
    <div className="script-editor-container">
      <EditorContent editor={editor} />
    </div>
  );
};
