import { create } from 'zustand';
import { Script } from '../types/comic';

interface ScriptState {
  script: Script | null;
  addPage: () => void;
  addPanel: (pageId: string) => void;
  addBlock: (panelId: string) => void;
}

export const useScriptStore = create<ScriptState>((set) => ({
  script: null, // Initial state

  addPage: () => set((state) => {
    console.log('Placeholder: addPage called');
    return state;
  }),

  addPanel: (pageId: string) => set((state) => {
    console.log(`Placeholder: addPanel called for pageId: ${pageId}`);
    return state;
  }),

  addBlock: (panelId: string) => set((state) => {
    console.log(`Placeholder: addBlock called for panelId: ${panelId}`);
    return state;
  }),
}));
