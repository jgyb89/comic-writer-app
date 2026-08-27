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
