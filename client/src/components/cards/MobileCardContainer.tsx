import { CardType, DEPOSIT, ORDER, PRICE, TRADE, WALLET, WITHDRAW } from '../../types';
import DepositCard from './DepositCard';
import OrderCard from './OrderCard';
import PriceCard from './PriceCard';
import TradeCard from './TradeCard';
import WalletCard from './WalletCard';
import WithdrawCard from './WithdrawCard';
import ConnectWallet from '../../ConnectWallet';
import { useDexStore } from '../../store';
import GradientCardWrapper from './GradientCardWrapper';

export default function MobileCardContainer() {
  const account = useDexStore((state) => state.account);
  const card = useDexStore((state) => state.currentCard);
  const setCard = useDexStore((state) => state.setCurrentCard);

  const renderCard = (card: CardType) => {
    switch (card) {
      case WALLET:
        return account ? <WalletCard /> : <ConnectWallet />;
      case TRADE:
        return account ? <TradeCard /> : <ConnectWallet />;
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
  return <GradientCardWrapper className="md:hidden grow h-[200px]">{renderCard(card)}</GradientCardWrapper>;
}
