import { StateCreator } from 'zustand';
import { SheetType } from '../types';

export type ActionSheetSlice = {
  actionSheet: SheetType | null;
  actionSheetOpen: boolean;
  setActionSheetOpen: (value: boolean) => void;
  displayActionSheet: (sheet: SheetType) => void;
};

export const createActionSheetSlice: StateCreator<ActionSheetSlice> = (set) => ({
  actionSheet: null,
  actionSheetOpen: false,
  displayActionSheet: (sheet: SheetType) => set({ actionSheet: sheet, actionSheetOpen: true }),
  setActionSheetOpen: (value: boolean) => set({ actionSheetOpen: value }),
});
