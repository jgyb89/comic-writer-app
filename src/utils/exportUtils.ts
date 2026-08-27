import { Script, BlockType } from '../types/comic';

export const exportForLetterer = (script: Script): void => {
  let exportText = '';

  script.pages.forEach((page, pageIndex) => {
    let hasLetteringOnPage = false;
    let pageText = `--- PAGE ${pageIndex + 1} ---\n\n`;

    page.panels.forEach((panel, panelIndex) => {
      let panelText = `PANEL ${panelIndex + 1}\n`;
      let hasLetteringInPanel = false;
      let lastCharacter = '';

      panel.blocks.forEach((block) => {
        if (block.type === BlockType.Character) {
          lastCharacter = block.content.trim().toUpperCase();
        } else if (block.type === BlockType.Dialogue) {
          const charName = lastCharacter ? lastCharacter : 'UNKNOWN';
          panelText += `${charName}: ${block.content.trim()}\n`;
          hasLetteringInPanel = true;
          hasLetteringOnPage = true;
        }
      });

      if (hasLetteringInPanel) {
        pageText += panelText + '\n';
      }
    });

    if (hasLetteringOnPage) {
      exportText += pageText;
    }
  });

  const scriptTitle = script.title ? script.title.replace(/[^a-z0-9]/gi, '_') : 'Untitled';
  const filename = `${scriptTitle}_Lettering_Script.txt`;

  const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
