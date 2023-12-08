import { create } from 'zustand';

type Store = {
  actionSheetOpen: boolean;
  setActionSheetOpen: (value: boolean) => void;
};

export const useDexStore = create<Store>()((set) => ({
  actionSheetOpen: false,
  setActionSheetOpen: (value: boolean) => set({ actionSheetOpen: value }),
}));
