import { PrimaryButton } from './components/shared/PrimaryButton';
import { useDexStore } from './store';

export default function ConnectWallet() {
  const setActionSheetOpen = useDexStore((state) => state.setActionSheetOpen);

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full text-center">
      <p>Connect your wallet to start trading.</p>
      <PrimaryButton action={() => setActionSheetOpen(true)}>Connect Wallet</PrimaryButton>
    </div>
  );
}
