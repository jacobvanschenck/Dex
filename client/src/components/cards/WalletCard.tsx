import { PrimaryButton } from '../shared/PrimaryButton';
import { CardType, DEPOSIT, TokenType, WITHDRAW } from '../../types';
import { Dispatch, SetStateAction } from 'react';

type WalletCardProps = {
  selectedToken: TokenType;
  setCard: Dispatch<SetStateAction<CardType>>;
};

export default function WalletCard({ selectedToken, setCard }: WalletCardProps) {
  return (
    <div className="flex flex-col gap-3 justify-end items-start">
      <p className="text-primary-200">Total balance</p>
      <p className="text-4xl font-bold">
        1.0001 <span className="text-2xl font-normal">{selectedToken}</span>
      </p>
      <div className="flex gap-4">
        <PrimaryButton action={() => setCard(DEPOSIT)}>
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
        <PrimaryButton action={() => setCard(WITHDRAW)}>
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
