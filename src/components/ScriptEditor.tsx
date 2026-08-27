import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ComicBlock } from './ComicBlockExtension';
import { useScriptStore } from '../store/scriptStore';
import { parseTiptapToScript } from '../utils/syncUtils';
import { EditorToolbar } from './EditorToolbar';

export const ScriptEditor: React.FC = () => {
  const updateScript = useScriptStore(state => state.updateScript);

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
      const json = editor.getJSON();
      const script = parseTiptapToScript(json);
      updateScript(script);
    }
  });

  // Call onUpdate once manually on mount to sync initial content to store if needed,
  // but for this implementation we rely on the first user action or a useEffect hook.

  return (
    <div className="script-editor-container" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <EditorToolbar />
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};


