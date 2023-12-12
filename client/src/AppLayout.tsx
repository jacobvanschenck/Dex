import { useState } from 'react';
import TokenPillsContainer from './components/TokenPillsContainer';
import MobileNav from './components/nav/MobileNav';
import { CARDS, CardType, TOKENS, TokenType } from './types';
import CardContainer from './components/cards/CardContainer';
import ActionSheet from './components/actionsheets/ActionSheet';
import TradeChart from './components/TradeChart';

export default function AppLayout() {
  const [currentCard, setCurrentCard] = useState<CardType>(CARDS[0]);
  const [selectedToken, setSelectedToken] = useState<TokenType>(TOKENS[0]);

  return (
    <div className="flex flex-col gap-4 items-center py-7 px-3 h-screen font-sans text-neutral-100 bg-neutral-900">
      <div className="py-6 text-4xl font-light uppercase">
        Tsunami<span className="font-extrabold">Trades</span>
      </div>
      <TradeChart selectedToken={selectedToken} />
      <TokenPillsContainer selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
      <CardContainer setCard={setCurrentCard} selectedToken={selectedToken} card={currentCard} />
      <MobileNav currentCard={currentCard} setCurrentCard={setCurrentCard} />
      <ActionSheet />
    </div>
  );
}
