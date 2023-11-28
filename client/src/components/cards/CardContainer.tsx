import { CardType } from '../../types';
import OrderCard from './OrderCard';
import PriceCard from './PriceCard';
import TradeCard from './TradeCard';
import WalletCard from './WalletCard';

type CardContainerProps = {
  card: CardType;
};

export default function CardContainer({ card }: CardContainerProps) {
  const renderCard = (card: CardType) => {
    switch (card) {
      case 'WALLET':
        return <WalletCard />;
      case 'TRADE':
        return <TradeCard />;
      case 'ORDER':
        return <OrderCard />;
      case 'PRICE':
        return <PriceCard />;
    }
  };
  return (
    <div className="flex flex-1 py-8 px-10 w-full bg-gradient-to-br rounded-[50px] from-primary-500 from-70% to-primary-300">
      {renderCard(card)}
    </div>
  );
}
