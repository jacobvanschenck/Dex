import { useDexStore } from '../../store';
import { PrimaryButton } from '../shared/PrimaryButton';

type WithdrawCardProps = {
  onBack: () => void;
};

export default function WithdrawCard({ onBack }: WithdrawCardProps) {
  const selectedToken = useDexStore((state) => state.selectedToken);
  return (
    <div className="flex flex-col justify-between">
      <button className="flex w-fit" onClick={onBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back
      </button>
      <div className="flex flex-col gap-4 justify-end items-start">
        <div className="flex gap-2 items-end">
          <label className="transition-colors duration-100 text-primary-200 focus-within:text-primary-50">
            Amount
            <input
              type="number"
              inputMode="numeric"
              placeholder="0.0000"
              className="w-full text-4xl font-bold bg-transparent outline-none placeholder:text-primary-200 focus:placeholder:text-primary-50"
            />
          </label>
          <p className="text-2xl font-normal text-primary-200">{selectedToken}</p>
        </div>
        <div className="flex justify-between w-full">
          <div className="text-primary-200 min-w-fit">
            <p>Available</p>
            <p>
              1.001 <span>{selectedToken}</span>
            </p>
          </div>
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
    </div>
  );
}
