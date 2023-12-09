import { DexAbi } from './contracts/DexAbi';
import { TokenAbi } from './contracts/TokenAbi';
import {
  Address,
  GetContractReturnType,
  PublicClient,
  WalletClient,
  createPublicClient,
  createWalletClient,
  custom,
  getContract,
  http,
  publicActions,
} from 'viem';
import { goerli, mainnet, sepolia } from 'viem/chains';
import { EthereumProvider } from '@walletconnect/ethereum-provider';

export type DexContract = GetContractReturnType<typeof DexAbi, PublicClient, WalletClient>;
export type TokenContract = GetContractReturnType<typeof TokenAbi, PublicClient, WalletClient>;
export type TokenStructType = {
  tokenAddress: Address;
  ticker: Address;
  name: string;
};
export type Order = {
  id: bigint;
  trader: Address;
  side: bigint;
  ticker: Address;
  amount: bigint;
  filled: bigint;
  price: bigint;
  date: bigint;
};
export type Trade = {
  tradeId: bigint;
  orderId: bigint;
  ticker: Address;
  trader1: Address;
  trader2: Address;
  amount: bigint;
  price: bigint;
  date: bigint;
};

export const getDexReadWrite = async (publicClient: PublicClient, walletClient: WalletClient): Promise<DexContract> => {
  const dex = getContract({
    address: '0xe3B970200669bB3258886e0a8E5c97504d93ba31',
    abi: DexAbi,
    publicClient,
    walletClient,
  });
  return dex;
};

export const getDexTradeEvents = async (client: PublicClient, dex: DexContract) => {
  const filter = await client.createContractEventFilter({
    address: dex.address,
    abi: DexAbi,
    eventName: 'NewTrade',
  });
  const logs = client.getFilterLogs({ filter });
  return logs;
};

export const getTokenReadWrite = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  tokenAddress: Address,
) => {
  const token = getContract({
    address: tokenAddress,
    abi: TokenAbi,
    publicClient,
    walletClient,
  });
  return token;
};

export function getPublicClient() {
  return createPublicClient({
    chain: sepolia,
    transport: http(
      `https://eth-sepolia.g.alchemy.com/v2/${
        process.env.NETLIFY === 'true' ? process.env.VITE_ALCHEMY_API_KEY : import.meta.env.VITE_ALCHEMY_API_KEY
      }`,
    ),
  });
}

export function getWalletClient() {
  return createWalletClient({
    chain: sepolia,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    transport: custom(window.ethereum),
  }).extend(publicActions);
}

export async function getWCEthereumProvider() {
  const projectId =
    process.env.NETLIFY === 'true' ? process.env.VITE_WC_PROJECT_ID : import.meta.env.VITE_WC_PROJECT_ID;
  const provider = await EthereumProvider.init({
    projectId,
    showQrModal: false,
    chains: [mainnet.id],
    optionalChains: [goerli.id, sepolia.id],
    metadata: {
      name: 'TsunamiTrades',
      description: 'Decentrailzed exchange for Market and Limit orders',
      url: 'https://dex-vs.netlify.app/',
      icons: ['https://avatars.githubusercontent.com/u/37784886'],
    },
  });
  return provider;
}

export function isAndroid(): boolean {
  return typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);
}

export function isSmallIOS(): boolean {
  return typeof navigator !== 'undefined' && /iPhone|iPod/.test(navigator.userAgent);
}

export function isLargeIOS(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    (/iPad/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))
  );
}

export function isIOS(): boolean {
  return isSmallIOS() || isLargeIOS();
}

export function isMobile(): boolean {
  return isAndroid() || isIOS();
}
