import { useCallback, useState } from 'react';
import Pill from '../Pill';
import { PrimaryButton } from '../shared/PrimaryButton';
import { useDexStore } from '../../store';
import { BUY, LIMIT, MARKET, SELL, TICKER } from '../../consts';
import { DexAbi } from '../../contracts/DexAbi';
import { pad } from 'viem/utils';
import { sepolia } from 'viem/chains';

export default function TradeCard() {
  const selectedToken = useDexStore((state) => state.selectedToken);
  const account = useDexStore((state) => state.account);
  const publicClient = useDexStore((state) => state.publicClient);
  const [side, setSide] = useState(BUY);
  const [type, setType] = useState(LIMIT);
  const [amount, setAmount] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const createLimitOrder = useCallback(async () => {
    if (!selectedToken || !account || !amount || !price) return;
    try {
      const { request } = await publicClient.simulateContract({
        address: '0xe3B970200669bB3258886e0a8E5c97504d93ba31',
        abi: DexAbi,
        functionName: 'createLimitOrder',
        account,
        args: [pad(TICKER[selectedToken], { dir: 'right' }), BigInt(amount), BigInt(price), side],
        chain: sepolia,
      });

      console.log(request);
    } catch (err) {
      console.error(err);
    }
  }, [account, publicClient, selectedToken, side, amount, price]);

  const createMarketOrder = useCallback(async () => {
    if (!selectedToken || !account || !amount) return;
    try {
      const { request } = await publicClient.simulateContract({
        address: '0xe3B970200669bB3258886e0a8E5c97504d93ba31',
        abi: DexAbi,
        functionName: 'createMarketOrder',
        account,
        args: [pad(TICKER[selectedToken], { dir: 'right' }), BigInt(amount), side],
        chain: sepolia,
      });

      console.log(request);
    } catch (err) {
      console.error(err);
    }
  }, [account, publicClient, selectedToken, side, amount]);

  return (
    <div className="flex flex-col gap-3 justify-between w-full">
      <div className="flex gap-2">
        <div className="flex gap-1 p-2 grow bg-primary-800 rounded-[50px]">
          <Pill caption="Limit" isSelected={type === LIMIT} onClick={() => setType(LIMIT)} />
          <Pill caption="Market" isSelected={type === MARKET} onClick={() => setType(MARKET)} />
        </div>
        <div className="flex flex-1 gap-1 p-2 bg-primary-800 rounded-[50px]">
          <Pill caption="Buy" isSelected={side === BUY} onClick={() => setSide(BUY)} />
          <Pill caption="Sell" isSelected={side === SELL} onClick={() => setSide(SELL)} />
        </div>
      </div>
      {selectedToken !== 'DAI' && (
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-end">
            <label className="transition-colors duration-100 text-primary-200 focus-within:text-primary-50">
              Amount
              <input
                type="number"
                inputMode="numeric"
                placeholder="0.0000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full text-4xl font-bold bg-transparent outline-none placeholder:text-primary-200 focus:placeholder:text-primary-50"
              />
            </label>
            <p className="text-2xl font-normal text-primary-200">{selectedToken}</p>
          </div>
          <div className="flex gap-2 items-end h-16">
            {type === LIMIT && (
              <>
                <label className="transition-colors duration-100 text-primary-200 focus-within:text-primary-50">
                  Price
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full text-4xl font-bold bg-transparent outline-none placeholder:text-primary-200 focus:placeholder:text-primary-50"
                  />
                </label>
                <p className="text-2xl font-normal text-primary-200">{selectedToken}/DAI</p>
              </>
            )}
          </div>
          <div className="flex justify-center">
            <PrimaryButton asyncAction={type === LIMIT ? createLimitOrder : createMarketOrder}>
              Create Order
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}
