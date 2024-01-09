import { useDexStore } from '../../store';
import { PrimaryButton } from '../shared/PrimaryButton';
import { formatBalance } from '../../utils';
import { useCallback, useState } from 'react';
import { DEX_ADDRESS, TICKER, TOKEN_ADDRESS } from '../../consts';
import { TokenAbi } from '../../contracts/TokenAbi';
import { pad, parseEther } from 'viem';
import { DexAbi } from '../../contracts/DexAbi';
import { getBalances } from '../providers/WalletProvider';
import { displayToast } from '../Notifications';

type WithdrawCardProps = {
  onBack: () => void;
};

export default function WithdrawCard({ onBack }: WithdrawCardProps) {
  const selectedToken = useDexStore((state) => state.selectedToken);
  const balances = useDexStore((state) => state.balances);
  const walletClient = useDexStore((state) => state.walletClient);
  const publicClient = useDexStore((state) => state.publicClient);
  const account = useDexStore((state) => state.account);
  const setBalances = useDexStore((state) => state.setBalances);

  const [amount, setAmount] = useState<string>();

  const withdrawToken = useCallback(async () => {
    if (!walletClient || !account || !balances) return;
    if (!amount || parseInt(amount) === 0) return displayToast('You need to enter an amount', { type: 'warning' });

    if (parseEther(amount) > balances[`DEX_${selectedToken}`])
      return displayToast(`You don't have enough ${selectedToken} deposited to withdraw that much`, {
        type: 'warning',
      });

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

      const { request: requestWithdraw } = await publicClient.simulateContract({
        account,
        address: DEX_ADDRESS,
        abi: DexAbi,
        functionName: 'withdraw',
        args: [parseEther(amount, 'wei'), pad(TICKER[selectedToken], { dir: 'right' })],
      });
      const hashWithdraw = await walletClient.writeContract(requestWithdraw);
      const receiptWithdraw = await publicClient.waitForTransactionReceipt({ hash: hashWithdraw });

      if (receiptWithdraw) displayToast('Withdrawl successful', { type: 'success' });

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
      <div className="flex flex-col gap-4 justify-end items-start">
        <div className="flex gap-2 items-end">
          <label className="transition-colors duration-100 text-primary-200 focus-within:text-primary-50">
            Amount
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="numeric"
              placeholder="0.0000"
              className="w-full text-4xl font-bold bg-transparent outline-none placeholder:text-primary-200 focus:placeholder:text-primary-50"
            />
          </label>
          <p className="text-2xl font-normal text-primary-200">{selectedToken}</p>
        </div>
        <div className="flex justify-between w-full">
          <div className="text-primary-200 min-w-fit">
            <p>Available in Dex</p>
            <p>
              {balances && formatBalance(balances[`DEX_${selectedToken}`])} <span>{selectedToken}</span>
            </p>
          </div>
          <PrimaryButton asyncAction={withdrawToken}>
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
