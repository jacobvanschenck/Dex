import { useDexStore } from '../../store';
import Avatar from '../Avatar';

export default function ConnectButton() {
  const setActionSheetOpen = useDexStore((state) => state.setActionSheetOpen);
  const account = useDexStore((state) => state.account);
  const balance = useDexStore((state) => state.balance);

  return account ? (
    <button onClick={() => setActionSheetOpen(true)} className="flex gap-2 items-center px-5 rounded-[50px]">
      <p className="font-bold">{balance} SepoliaETH</p>
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
      className="py-4 px-5 text-xs font-bold bg-violet-500 rounded-[50px] h-fit md:text-md"
      onClick={() => setActionSheetOpen(true)}
    >
      Connect Wallet
    </button>
  );
}
