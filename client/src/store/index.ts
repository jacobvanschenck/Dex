import { PublicClient } from 'viem';
import { create } from 'zustand';
import { getPublicClient } from '../utils';

type Store = {
  actionSheetOpen: boolean;
  setActionSheetOpen: (value: boolean) => void;
  publicClient: PublicClient;
};

export const useDexStore = create<Store>()((set) => ({
  actionSheetOpen: false,
  setActionSheetOpen: (value: boolean) => set({ actionSheetOpen: value }),
  publicClient: getPublicClient(),
}));
