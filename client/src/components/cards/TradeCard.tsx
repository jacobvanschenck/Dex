import { useState } from 'react';
import Pill from '../Pill';
import { PrimaryButton } from '../shared/PrimaryButton';
import { useDexStore } from '../../store';

const BUY = 'BUY';
const SELL = 'SELL';
const MARKET = 'MARKET';
const LIMIT = 'LIMIT';

export default function TradeCard() {
  const selectedToken = useDexStore((state) => state.selectedToken);
  const [side, setSide] = useState(BUY);
  const [type, setType] = useState(LIMIT);

  return (
    <div className="flex flex-col gap-3 justify-between">
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
      <div className="flex flex-col gap-3">
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
        <div className="flex gap-2 items-end">
          <label className="transition-colors duration-100 text-primary-200 focus-within:text-primary-50">
            Price
            <input
              type="number"
              inputMode="numeric"
              placeholder="0"
              className="w-full text-4xl font-bold bg-transparent outline-none placeholder:text-primary-200 focus:placeholder:text-primary-50"
            />
          </label>
          <p className="text-2xl font-normal text-primary-200">{selectedToken}/DAI</p>
        </div>
        <div className="flex justify-center">
          <PrimaryButton>Create Order</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
