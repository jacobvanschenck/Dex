import TokenPillsContainer from './components/TokenPillsContainer';
import MobileNav from './components/nav/MobileNav';
import MobileCardContainer from './components/cards/MobileCardContainer';
import ActionSheet from './components/actionsheets/ActionSheet';
import TradeChart from './components/TradeChart';
import WalletProvider from './components/providers/WalletProvider';
import OrderCard from './components/cards/OrderCard';
import PriceCard from './components/cards/PriceCard';
import GradientCardWrapper from './components/cards/GradientCardWrapper';
import WalletCard from './components/cards/WalletCard';
import TradeCard from './components/cards/TradeCard';
import { useDexStore } from './store';
import ConnectButton from './components/shared/ConnectButton';
import { TOKEN_SHEET } from './types';

export default function AppLayout() {
  const account = useDexStore((state) => state.account);
  const selectedToken = useDexStore((state) => state.selectedToken);
  const displayActionSheet = useDexStore((state) => state.displayActionSheet);

  return (
    <div className="flex flex-col gap-4 items-center py-7 px-3 font-sans md:p-8 h-[100dvh] text-neutral-100 bg-neutral-900">
      <WalletProvider />
      <nav className="flex sticky justify-between items-center px-3 w-full">
        <div className="flex flex-col text-2xl font-light uppercase sm:flex-row md:text-4xl">
          Tsunami<span className="font-extrabold">Trades</span>
        </div>
        <div className="flex gap-4 items-center">
          <button className="flex gap-1 md:hidden" onClick={() => displayActionSheet(TOKEN_SHEET)}>
            {selectedToken}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <ConnectButton />
        </div>
      </nav>
      <div className="flex overflow-y-auto flex-col gap-4 w-full h-full md:flex-row md:gap-8">
        <div className="flex flex-col gap-4 w-full md:gap-8">
          <TradeChart />
          <div className="hidden md:flex md:gap-8">
            <GradientCardWrapper className="h-[360px] xl:w-[400px]">
              <OrderCard />
            </GradientCardWrapper>
            <GradientCardWrapper className="h-[360px] xl:w-[400px]">
              <PriceCard />
            </GradientCardWrapper>
          </div>
        </div>
        <div className="flex flex-col flex-none gap-4 items-center md:gap-8 grow">
          <TokenPillsContainer />
          <div className="hidden md:flex md:flex-col md:gap-8 md:w-[24rem] md:grow">
            <GradientCardWrapper>
              {account ? (
                <WalletCard />
              ) : (
                <div className="flex flex-col gap-4 justify-center items-center w-full text-center">
                  <p>Connect your wallet to start trading.</p>
                  <ConnectButton />
                </div>
              )}
            </GradientCardWrapper>
            <GradientCardWrapper className="min-h-[360px] max-h-[360px]">
              {account ? (
                <TradeCard />
              ) : (
                <div className="flex flex-col gap-4 justify-center items-center w-full text-center">
                  <p>Connect your wallet to start trading.</p>
                  <ConnectButton />
                </div>
              )}
            </GradientCardWrapper>
          </div>
          <MobileCardContainer />
          <MobileNav />
          <ActionSheet />
        </div>
      </div>
    </div>
  );
}
