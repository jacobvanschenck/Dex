import TokenPillsContainer from './components/TokenPillsContainer';
import MobileNav from './components/nav/MobileNav';
import WalletCard from './components/wallet/WalletCard';

export default function AppLayout() {
  return (
    <div className="flex flex-col gap-4 items-center py-7 px-3 h-screen font-sans text-neutral-100 bg-neutral-900">
      <div className="py-6 text-4xl font-light uppercase">
        Tsunami<span className="font-extrabold">Trades</span>
      </div>
      <div className="flex justify-center items-center w-full h-1/4 border-2 bg border-neutral-50">Chart goes here</div>
      <TokenPillsContainer />
      <WalletCard />
      <MobileNav />
    </div>
  );
}
