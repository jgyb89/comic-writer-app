export enum BlockType {
  Action = 'Action',
  Character = 'Character',
  Dialogue = 'Dialogue',
  Parenthetical = 'Parenthetical',
  PanelCue = 'PanelCue',
}

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  // Note: Custom properties for "lore integration" and "split-screen data mapping"
  // were requested by parsing "Comic Writer App", but that file was not found.
  // Add those properties here if needed.
}

export interface Panel {
  id: string;
  blocks: Block[];
}

export interface Page {
  id: string;
  panels: Panel[];
}

export interface Script {
  id: string;
  title: string;
  pages: Page[];
}
