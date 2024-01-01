import ConnectButton from './components/shared/ConnectButton';

export default function ConnectWallet() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full text-center">
      <p>Connect your wallet to start trading.</p>
      <ConnectButton />
    </div>
  );
}
