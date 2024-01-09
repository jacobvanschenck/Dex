import { Address } from 'viem';
import { BAT, DAI, REP, TokenType, ZRX } from './types';

// const rainbowWallet = {
//   url: 'rainbow://wc?uri=',
//   icon: '/img/rainbowWallet.svg',
//   name: 'Rainbow',
//   iconBackground: '#0c2f78',
// };

// const trustWallet = {
//   url: 'trust://wc?uri=',
//   icon: '/img/trustWallet.svg',
//   name: 'Trust',
//   iconBackground: '#fff',
// };

const metaMaskWallet = {
  url: 'metamask://wc?uri=',
  icon: '/img/metaMaskWallet.svg',
  name: 'MetaMask',
  iconBackground: '#fff',
};

// export const mobileWallets = [rainbowWallet, trustWallet, metaMaskWallet];
export const mobileWallets = [metaMaskWallet];

// ADDRESSES
export const DEX_ADDRESS = '0xe3B970200669bB3258886e0a8E5c97504d93ba31';
export const DAI_ADDRESS = '0x2487fC2B8c785E57D9752ABFD8E9a6696DEebb1C';
export const BAT_ADDRESS = '0x0DcC9f27a42a19d9b4dd3cf25A591DB030aB820A';
export const REP_ADDRESS = '0x58dfd3A9C6Cf1072E5A3A9D800E2aD47dD0327c8';
export const ZRX_ADDRESS = '0x6b65E74E68CaF377636e439B71f7D62d71F53cAe';

export const TOKEN_ADDRESS: Record<TokenType, Address> = {
  [DAI]: DAI_ADDRESS,
  [BAT]: BAT_ADDRESS,
  [REP]: REP_ADDRESS,
  [ZRX]: ZRX_ADDRESS,
};

// TICKERS
const DAI_TICKER = '0x444149';
const BAT_TICKER = '0x424154';
const REP_TICKER = '0x524550';
const ZRX_TICKER = '0x5a5258';

export const TICKER: Record<TokenType, Address> = {
  [DAI]: DAI_TICKER,
  [BAT]: BAT_TICKER,
  [REP]: REP_TICKER,
  [ZRX]: ZRX_TICKER,
};

// TRADES
export const BUY = 0;
export const SELL = 1;
export const MARKET = 'MARKET';
export const LIMIT = 'LIMIT';

// ORDERS
export const ALL_ORDERS = 'ALL_ORDERS';
export const MY_ORDERS = 'MY_ORDERS';

export const SIDE = {
  BUY: 0,
  SELL: 1,
};
