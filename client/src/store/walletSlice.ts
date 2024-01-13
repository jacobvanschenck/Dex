import Provider from '@walletconnect/ethereum-provider';
import { Address, PublicClient, WalletClient } from 'viem';
import { StateCreator } from 'zustand';
import { getEthereumProvider, getPublicClient } from '../utils';
import { Orders } from '../components/cards/OrderCard';

export type WalletSlice = {
  isConnected: boolean;
  provider: Provider | null;
  setProvider: (provider: Provider) => void;
  account: Address | null;
  setAccount: (account: Address | null) => void;
  balances: Record<string, bigint> | null;
  setBalances: (balances: Record<string, bigint> | null) => void;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  publicClient: PublicClient;
  walletClient: WalletClient | null;
  setWalletClient: (client: WalletClient) => void;
  orders: Orders | null;
  setOrders: (orders: Orders) => void;
};

export const createWalletSlice: StateCreator<WalletSlice> = (set, get) => ({
  isConnected: JSON.parse(window.localStorage.getItem('dex.wc_connected') as string),
  provider: null,
  setProvider: (provider: Provider) => set({ provider }),
  account: null,
  setAccount: (account: Address | null) => set({ account }),
  balances: null,
  setBalances: (balances: Record<string, bigint> | null) => set({ balances }),
  connect: async () => {
    const provider = await getEthereumProvider();
    const isConnected = get().isConnected;
    if (!provider) return;
    if (!isConnected) {
      await provider.connect();
      window.localStorage.setItem('dex.wc_connected', JSON.stringify(true));
      set({ account: provider.accounts[0] as Address, isConnected: true });
    }
  },
  disconnect: async () => {
    const provider = get().provider;
    if (!provider) return;

    const wcConnected = JSON.parse(window.localStorage.getItem('dex.wc_connected') || 'null');
    const metaConnected = JSON.parse(window.localStorage.getItem('dex.metamask_connected') || 'null');

    if (wcConnected) {
      window.localStorage.setItem('dex.wc_connected', JSON.stringify(false));
      await provider.disconnect();
    }
    if (metaConnected) {
      window.localStorage.setItem('dex.metamask_connected', JSON.stringify(false));
    }
    set({ account: null, isConnected: false, balances: null });
  },
  publicClient: getPublicClient(),
  walletClient: null,
  setWalletClient: (client: WalletClient) => set({ walletClient: client }),
  orders: null,
  setOrders: (orders: Orders) => set({ orders }),
});
