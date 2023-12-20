import { create } from 'zustand';
import { ActionSheetSlice, createActionSheetSlice } from './actionSheetSlice';
import { WalletSlice, createWalletSlice } from './walletSlice';
import { NavSlice, createNavSlice } from './navSlice';

export const useDexStore = create<ActionSheetSlice & WalletSlice & NavSlice>()((...a) => ({
  ...createActionSheetSlice(...a),
  ...createWalletSlice(...a),
  ...createNavSlice(...a),
}));
