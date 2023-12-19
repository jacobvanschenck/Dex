import { PublicClient } from 'viem';
import { getPublicClient } from '../utils';
import { StateCreator } from 'zustand';

export type ActionSheetSlice = {
  actionSheetOpen: boolean;
  setActionSheetOpen: (value: boolean) => void;
  publicClient: PublicClient;
};

export const createActionSheetSlice: StateCreator<ActionSheetSlice> = (set) => ({
  actionSheetOpen: false,
  setActionSheetOpen: (value: boolean) => set({ actionSheetOpen: value }),
  publicClient: getPublicClient(),
});
