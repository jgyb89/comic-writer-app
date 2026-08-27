import Paragraph from '@tiptap/extension-paragraph';
import { mergeAttributes, InputRule } from '@tiptap/core';
import { BlockType } from '../types/comic';

export const ComicBlock = Paragraph.extend({
  name: 'comicBlock',

  addAttributes() {
    return {
      type: {
        default: BlockType.Action,
        parseHTML: element => element.getAttribute('data-type') || BlockType.Action,
        renderHTML: attributes => {
          return {
            'data-type': attributes.type,
            class: `comic-block ${attributes.type.toLowerCase()}`,
          };
        },
      },
      id: {
        default: null,
      }
    };
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const { state, dispatch } = this.editor.view;
        const { selection, tr } = state;
        const { $from, empty } = selection;

        if (!empty) return false;

        const node = $from.node($from.depth);
        if (node.type.name !== this.name) return false;

        if (node.attrs.type === BlockType.Character) {
          const newAttributes = { ...node.attrs, type: BlockType.Dialogue, id: null };
          dispatch(tr.split($from.pos, 1, [{ type: this.type, attrs: newAttributes }]));
          return true;
        }

        return false;
      },
      ...this.parent?.()
    };
  },

  addInputRules() {
    const parentRules = this.parent?.() || [];
    
    return [
      ...parentRules,
      new InputRule({
        find: /^PANEL $/,
        handler: ({ state, range }) => {
          const { tr } = state;
          const $start = tr.doc.resolve(range.from);
          const block = $start.node();
          
          if (block && block.type.name === this.name) {
            tr.delete(range.from, range.to);
            tr.setNodeMarkup($start.before(), null, { ...block.attrs, type: BlockType.PanelCue });
          }
        },
      }),
    ];
  },
});
