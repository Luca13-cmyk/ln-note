import { create } from "zustand";

type GeminiStore = {
  isOpen: boolean;
  selectedText: string;
  response: string;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
  onSelectedText: (text: string) => void;
  onResponse: (text: string) => void;
};

export const useGemini = create<GeminiStore>((set, get) => ({
  isOpen: false,
  selectedText: "",
  response: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onSelectedText: (text) => set({ selectedText: text }),
  toggle: () => set({ isOpen: !get().isOpen }),
  onResponse: (text: string) => set({ response: text }),
}));
