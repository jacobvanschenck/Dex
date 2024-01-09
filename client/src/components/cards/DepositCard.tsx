import { useDexStore } from '../../store';
import { formatBalance } from '../../utils';
import { DEX_ADDRESS, TICKER, TOKEN_ADDRESS } from '../../consts';
import { PrimaryButton } from '../shared/PrimaryButton';
import { useCallback, useState } from 'react';
import { DexAbi } from '../../contracts/DexAbi';
import { pad, parseEther } from 'viem';
import { TokenAbi } from '../../contracts/TokenAbi';
import { getBalances } from '../providers/WalletProvider';
import { displayToast } from '../Notifications';

type DepositCardProps = {
  onBack: () => void;
};

export default function DepositCard({ onBack }: DepositCardProps) {
  const selectedToken = useDexStore((state) => state.selectedToken);
  const balances = useDexStore((state) => state.balances);
  const account = useDexStore((state) => state.account);
  const publicClient = useDexStore((state) => state.publicClient);
  const walletClient = useDexStore((state) => state.walletClient);
  const setBalances = useDexStore((state) => state.setBalances);

  const [amount, setAmount] = useState<string>();

  const depositToken = useCallback(async () => {
    if (!walletClient || !account || !balances) return;
    if (!amount || parseInt(amount) === 0) return displayToast('You need to enter an amount', { type: 'warning' });

    if (parseEther(amount) > balances[selectedToken])
      return displayToast(`You don't have enough ${selectedToken} in your wallet`, { type: 'warning' });

    try {
      const { request: requestAllowance } = await publicClient.simulateContract({
        account,
        address: TOKEN_ADDRESS[selectedToken],
        abi: TokenAbi,
        functionName: 'increaseAllowance',
        args: [DEX_ADDRESS, parseEther(amount, 'wei')],
      });
      const hashAllowance = await walletClient.writeContract(requestAllowance);
      const receiptAllowance = await publicClient.waitForTransactionReceipt({ hash: hashAllowance });

      if (receiptAllowance) displayToast('Approved to transfer tokens', { type: 'success' });

      const { request: requestDeposit } = await publicClient.simulateContract({
        account,
        address: DEX_ADDRESS,
        abi: DexAbi,
        functionName: 'deposit',
        args: [parseEther(amount, 'wei'), pad(TICKER[selectedToken], { dir: 'right' })],
      });
      const hashDeposit = await walletClient.writeContract(requestDeposit);
      const receiptDeposit = await publicClient.waitForTransactionReceipt({ hash: hashDeposit });

      if (receiptDeposit) displayToast('Deposit successful', { type: 'success' });

      setBalances(await getBalances(account, publicClient));
    } catch (err) {
      console.error(err);
      displayToast('Something went wrong', { type: 'error' });
    }
  }, [publicClient, setBalances, walletClient, account, amount, selectedToken, balances]);

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
      <div className="flex flex-col gap-3 justify-end items-start">
        <div className="flex gap-2 items-end">
          <label className="transition-colors duration-100 text-primary-200 focus-within:text-primary-50">
            Amount
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
            <p>Available in Wallet</p>
            <p>
              {balances && formatBalance(balances[selectedToken])} <span>{selectedToken}</span>
            </p>
          </div>
          <PrimaryButton asyncAction={depositToken}>
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
        </div>
      </div>
    </div>
  );
}
