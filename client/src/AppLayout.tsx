import TokenPillsContainer from './components/TokenPillsContainer';
import MobileNav from './components/nav/MobileNav';
import CardContainer from './components/cards/CardContainer';
import ActionSheet from './components/actionsheets/ActionSheet';
import TradeChart from './components/TradeChart';
import WalletProvider from './components/providers/WalletProvider';

export default function AppLayout() {
  return (
    <div className="flex flex-col gap-4 items-center py-7 px-3 h-screen font-sans text-neutral-100 bg-neutral-900">
      <div className="py-6 text-4xl font-light uppercase">
        Tsunami<span className="font-extrabold">Trades</span>
      </div>
      <TradeChart />
      <TokenPillsContainer />
      <CardContainer />
      <MobileNav />
      <ActionSheet />
      <WalletProvider />
    </div>
  );
}
