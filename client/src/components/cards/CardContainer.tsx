import { Dispatch, SetStateAction } from 'react';
import { CardType, DEPOSIT, ORDER, PRICE, TRADE, TokenType, WALLET, WITHDRAW } from '../../types';
import DepositCard from './DepositCard';
import OrderCard from './OrderCard';
import PriceCard from './PriceCard';
import TradeCard from './TradeCard';
import WalletCard from './WalletCard';
import WithdrawCard from './WithdrawCard';

type CardContainerProps = {
  card: CardType;
  setCard: Dispatch<SetStateAction<CardType>>;
  selectedToken: TokenType;
};

export default function CardContainer({ card, setCard, selectedToken }: CardContainerProps) {
  const renderCard = (card: CardType) => {
    switch (card) {
      case WALLET:
        return <WalletCard setCard={setCard} selectedToken={selectedToken} />;
      case TRADE:
        return <TradeCard selectedToken={selectedToken} />;
      case ORDER:
        return <OrderCard />;
      case PRICE:
        return <PriceCard />;
      case DEPOSIT:
        return <DepositCard selectedToken={selectedToken} onBack={() => setCard(WALLET)} />;
      case WITHDRAW:
        return <WithdrawCard selectedToken={selectedToken} onBack={() => setCard(WALLET)} />;
    }
  };
  return (
    <div className="flex text-primary-50 flex-1 p-8 w-full bg-gradient-to-br rounded-[50px] from-primary-500 from-60% to-primary-300">
      {renderCard(card)}
    </div>
  );
}
