import { Address } from 'viem';
import { BAT, DAI, REP, ZRX } from './types';

const rainbowWallet = {
  url: 'rainbow://wc?uri=',
  icon: '/img/rainbowWallet.svg',
  name: 'Rainbow',
  iconBackground: '#0c2f78',
};

const trustWallet = {
  url: 'trust://wc?uri=',
  icon: '/img/trustWallet.svg',
  name: 'Trust',
  iconBackground: '#fff',
};

const metaMaskWallet = {
  url: 'metamask://wc?uri=',
  icon: '/img/metaMaskWallet.svg',
  name: 'MetaMask',
  iconBackground: '#fff',
};

export const mobileWallets = [rainbowWallet, trustWallet, metaMaskWallet];

export const DAI_TICKER = '0x444149';
export const BAT_TICKER = '0x424154';
export const REP_TICKER = '0x524550';
export const ZRX_TICKER = '0x5a5258';

export const TICKER: Record<string, Address> = {
  [DAI]: DAI_TICKER,
  [BAT]: BAT_TICKER,
  [REP]: REP_TICKER,
  [ZRX]: ZRX_TICKER,
};

// TRADES
export const BUY = 'BUY';
export const SELL = 'SELL';
export const MARKET = 'MARKET';
export const LIMIT = 'LIMIT';

// ORDERS
export const ALL_ORDERS = 'ALL_ORDERS';
export const MY_ORDERS = 'MY_ORDERS';

export const SIDE = {
  BUY: 0,
  SELL: 1,
};
