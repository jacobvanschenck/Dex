import { useDexStore } from '../../store';
import { ACCOUNT_SHEET } from '../../types';
import { formatBalance } from '../../utils';
import Avatar from '../Avatar';

export default function ConnectButton() {
  const displayActionSheet = useDexStore((state) => state.displayActionSheet);
  const account = useDexStore((state) => state.account);
  const balances = useDexStore((state) => state.balances);

  return account ? (
    <button
      onClick={() => displayActionSheet(ACCOUNT_SHEET)}
      className="flex gap-2 items-center transition-transform duration-200 rounded-[50px] active:enabled:scale-95"
    >
      <p className="hidden font-bold md:block">{balances && formatBalance(balances.ETH)} SepoliaETH</p>
      <Avatar username={account} />
      <p className="hidden text-lg font-bold md:block">{account.slice(0, 4) + '...' + account.slice(-4)}</p>
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
  ) : (
    <button
      className="flex gap-1 py-4 px-5 text-xs font-bold bg-violet-500 transition-transform duration-200 rounded-[50px] h-fit md:text-md active:enabled:scale-90"
      onClick={() => displayActionSheet(ACCOUNT_SHEET)}
    >
      Connect<span className="hidden md:block"> Wallet</span>
    </button>
  );
}
