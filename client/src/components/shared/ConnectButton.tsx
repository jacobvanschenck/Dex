import { useCallback } from 'react';
import { useDexStore } from '../../store';
import { minidenticon } from 'minidenticons';

export default function ConnectButton() {
  const setActionSheetOpen = useDexStore((state) => state.setActionSheetOpen);
  const account = useDexStore((state) => state.account);

  const createAvatar = useCallback((username: string) => {
    const res = minidenticon(username);
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(res);
  }, []);

  return account ? (
    <button onClick={() => setActionSheetOpen(true)} className="flex gap-2 items-center px-5 rounded-[50px]">
      <div className="rounded-full bg-neutral-50">
        <img width={40} height={40} alt="" src={createAvatar(account)} />
      </div>
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
    <button className="py-4 px-5 font-bold bg-violet-500 rounded-[50px] h-fit" onClick={() => setActionSheetOpen(true)}>
      Connect Wallet
    </button>
  );
}
