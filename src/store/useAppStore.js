import { create } from "zustand";

export const useAppStore = create((set) => ({
  activeTab: "home",

  setActiveTab: (tab) => set({ activeTab: tab }),
}));