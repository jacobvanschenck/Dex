import { PrimaryButton } from '../shared/PrimaryButton';

export default function WalletCard() {
  return (
    <div className="flex flex-col justify-end items-start">
      <p>total balance</p>
      <p>1.0001 DAI</p>
      <div className="flex gap-4">
        <PrimaryButton>
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
          Depost
        </PrimaryButton>
        <PrimaryButton>
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
