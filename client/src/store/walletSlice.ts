import Provider from '@walletconnect/ethereum-provider';
import { StateCreator } from 'zustand';

export type WalletSlice = {
  isConnected: boolean;
  provider: Provider | null;
  setProvider: (provider: Provider) => void;
  account: string | null;
  setAccount: (account: string | null) => void;
  connect: () => Promise<void>;
  reconnect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

export const createWalletSlice: StateCreator<WalletSlice> = (set, get) => ({
  isConnected: JSON.parse(window.localStorage.getItem('dex.connected') as string),
  provider: null,
  setProvider: (provider: Provider) => set({ provider }),
  account: null,
  setAccount: (account: string | null) => set({ account }),
  connect: async () => {
    const provider = get().provider;
    const isConnected = get().isConnected;
    if (!provider) return;
    if (!isConnected) {
      await provider.connect();
      window.localStorage.setItem('dex.connected', JSON.stringify(true));
      set({ account: provider.accounts[0], isConnected: true });
    }
  },
  reconnect: async () => {
    const provider = get().provider;
    const isConnected = get().isConnected;
    if (!provider) return;
    if (isConnected) {
      const accounts = await provider.enable();
      set({ account: accounts[0] });
    }
  },
  disconnect: async () => {
    const provider = get().provider;
    if (!provider) return;
    window.localStorage.setItem('dex.connected', JSON.stringify(false));
    set({ account: null, isConnected: false });
    await provider.disconnect();
  },
});
