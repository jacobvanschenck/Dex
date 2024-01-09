import { useDexStore } from '../../store';
import { DEPOSIT, WITHDRAW } from '../../types';
import { formatBalance } from '../../utils';
import { PrimaryButton } from '../shared/PrimaryButton';
import { WalletCardType } from './WalletCard';

type BalanceCardProps = {
  setDisplay: (display: WalletCardType) => void;
};

export default function BalanceCard({ setDisplay }: BalanceCardProps) {
  const selectedToken = useDexStore((state) => state.selectedToken);
  const balances = useDexStore((state) => state.balances);

  return (
    <div className="flex flex-col gap-3 justify-end items-start">
      <div>
        <p className="text-primary-200">Total balance</p>
        <p className="text-4xl font-bold">
          {balances && formatBalance(balances[`DEX_${selectedToken}`], 10)}{' '}
          <span className="text-2xl font-normal">{selectedToken}</span>
        </p>
      </div>
      <div className="flex gap-4">
        <PrimaryButton action={() => setDisplay(DEPOSIT)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
          Deposit
        </PrimaryButton>
        <PrimaryButton action={() => setDisplay(WITHDRAW)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
          </svg>
          Withdraw
        </PrimaryButton>
      </div>
    </div>
  );
}
