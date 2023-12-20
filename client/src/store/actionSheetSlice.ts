import { StateCreator } from 'zustand';

export type ActionSheetSlice = {
  actionSheetOpen: boolean;
  setActionSheetOpen: (value: boolean) => void;
};

export const createActionSheetSlice: StateCreator<ActionSheetSlice> = (set) => ({
  actionSheetOpen: false,
  setActionSheetOpen: (value: boolean) => set({ actionSheetOpen: value }),
});
