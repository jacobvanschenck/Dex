import { CardType, DEPOSIT, ORDER, PRICE, TRADE, WALLET, WITHDRAW } from '../../types';
import DepositCard from './DepositCard';
import OrderCard from './OrderCard';
import PriceCard from './PriceCard';
import TradeCard from './TradeCard';
import WalletCard from './WalletCard';
import WithdrawCard from './WithdrawCard';
import ConnectWallet from '../../ConnectWallet';
import { useDexStore } from '../../store';

export default function CardContainer() {
  const account = useDexStore((state) => state.account);
  const card = useDexStore((state) => state.currentCard);
  const setCard = useDexStore((state) => state.setCurrentCard);

  const renderCard = (card: CardType) => {
    switch (card) {
      case WALLET:
        return <WalletCard />;
      case TRADE:
        return <TradeCard />;
      case ORDER:
        return <OrderCard />;
      case PRICE:
        return <PriceCard />;
      case DEPOSIT:
        return <DepositCard onBack={() => setCard(WALLET)} />;
      case WITHDRAW:
        return <WithdrawCard onBack={() => setCard(WALLET)} />;
    }
  };
  return (
    <div className="flex text-primary-50 flex-grow p-8 w-full bg-gradient-to-br rounded-[50px] from-primary-500 from-60% overflow-hidden to-primary-300">
      {account ? renderCard(card) : <ConnectWallet />}
    </div>
  );
}
