import { JSONContent } from '@tiptap/core';
import { Script, Page, Panel, Block, BlockType } from '../types/comic';
// import { v4 as uuidv4 } from 'uuid'; // optional, but we can just use counter for id if not installed. Let's use simple IDs.

const generateId = () => Math.random().toString(36).substr(2, 9);

export const parseTiptapToScript = (tiptapJson: JSONContent): Script => {
  const script: Script = {
    id: generateId(),
    title: 'Untitled Script',
    pages: [],
  };

  let currentPage: Page | null = null;
  let currentPanel: Panel | null = null;

  const getActivePage = (): Page => {
    if (!currentPage) {
      currentPage = { id: generateId(), panels: [] };
      script.pages.push(currentPage);
    }
    return currentPage;
  };

  const getActivePanel = (page: Page): Panel => {
    if (!currentPanel) {
      currentPanel = { id: generateId(), blocks: [] };
      page.panels.push(currentPanel);
    }
    return currentPanel;
  };

  if (tiptapJson.content) {
    tiptapJson.content.forEach((node) => {
      let textContent = '';
      if (node.content) {
        textContent = node.content
          .filter(n => n.type === 'text')
          .map(n => n.text)
          .join('');
      }

      const blockType = (node.attrs?.type as BlockType) || BlockType.Action;

      const block: Block = {
        id: node.attrs?.id || generateId(),
        type: blockType,
        content: textContent,
      };

      const page = getActivePage();

      if (blockType === BlockType.PanelCue) {
        // Boundary: Create and push a new Panel into the current Page
        currentPanel = { id: generateId(), blocks: [block] };
        page.panels.push(currentPanel);
      } else {
        // Add block to the currently active panel
        const panel = getActivePanel(page);
        panel.blocks.push(block);
      }
    });
  }

  return script;
};
