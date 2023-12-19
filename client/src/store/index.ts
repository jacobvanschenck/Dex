import { create } from 'zustand';
import { ActionSheetSlice, createActionSheetSlice } from './actionSheetSlice';
import { WalletSlice, createWalletSlice } from './walletSlice';

export const useDexStore = create<ActionSheetSlice & WalletSlice>()((...a) => ({
  ...createActionSheetSlice(...a),
  ...createWalletSlice(...a),
}));
