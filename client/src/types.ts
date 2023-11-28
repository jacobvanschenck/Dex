export const WALLET = 'WALLET';
export const TRADE = 'TRADE';
export const ORDER = 'ORDER';
export const PRICE = 'PRICE';

export type CardType = typeof WALLET | typeof TRADE | typeof ORDER | typeof PRICE;
export const CARDS = [WALLET, TRADE, ORDER, PRICE] as const;

export const DAI = 'DAI';
export const BAT = 'BAT';
export const REP = 'REP';
export const ZRX = 'ZRX';

export type TokenType = typeof DAI | typeof BAT | typeof REP | typeof ZRX;
export const TOKENS = [DAI, BAT, REP, ZRX] as const;
