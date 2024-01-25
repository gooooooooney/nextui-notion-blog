import { create } from "zustand";

 type LightBoxStore = {
  blockId: string;
  setBlockId: (blockId: string) => void;
 }

  export const useLightBox = create<LightBoxStore>((set) => ({
    blockId: "",
    setBlockId: (blockId: string) => set({ blockId }),
  }));