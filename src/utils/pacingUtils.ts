import { Block, BlockType } from '../types/comic';

export const calculatePanelDialogueWords = (blocks: Block[]): number => {
  return blocks
    .filter(block => block.type === BlockType.Dialogue)
    .reduce((total, block) => {
      // Split by whitespace to count words, handling empty strings or punctuation if needed
      const words = block.content.trim().split(/\s+/).filter(word => word.length > 0);
      return total + words.length;
    }, 0);
};
