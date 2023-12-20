import { StateCreator } from 'zustand';
import { CARDS, CardType, TOKENS, TokenType } from '../types';

export type NavSlice = {
  selectedToken: TokenType;
  setSelectedToken: (token: TokenType) => void;
  currentCard: CardType;
  setCurrentCard: (card: CardType) => void;
};

export const createNavSlice: StateCreator<NavSlice> = (set) => ({
  selectedToken: TOKENS[0],
  setSelectedToken: (token) => set({ selectedToken: token }),
  currentCard: CARDS[0],
  setCurrentCard: (card) => set({ currentCard: card }),
});
