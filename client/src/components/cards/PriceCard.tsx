import { useCallback, useEffect, useState } from 'react';
import { useDexStore } from '../../store';
import { Trade, getDexRead, getDexTradeEvents, getRelativeDateFromBlockTimestamp } from '../../utils';
import { PublicClient, pad } from 'viem';
import { TICKER } from '../../consts';
import { SyncLoader } from 'react-spinners';

export default function PriceCard() {
  const selectedToken = useDexStore((state) => state.selectedToken);
  const publicClient = useDexStore((state) => state.publicClient);

  const [trades, setTrades] = useState<Array<Trade>>();

  const getTrades = useCallback(
    async (client: PublicClient) => {
      try {
        const dex = await getDexRead(client);
        if (dex) {
          const logs = await getDexTradeEvents(client, dex);
          setTrades(
            logs
              .filter((log) => log.args.ticker === pad(TICKER[selectedToken], { dir: 'right' }))
              .map((l) => {
                return {
                  amount: l.args.amount?.toString() ?? 'missing',
                  price: l.args.price?.toString() ?? 'missing',
                  date: getRelativeDateFromBlockTimestamp(l.args.date),
                };
              }),
          );
        }
      } catch (err) {
        console.error(err);
      }
    },
    [selectedToken],
  );

  useEffect(() => {
    if (!publicClient) return;
    getTrades(publicClient);
  }, [publicClient, getTrades]);

  if (!trades)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <SyncLoader color={'#FEFCEA'} />
      </div>
    );

  return (
    <div className="flex flex-col items-start px-4 w-full">
      <p className="pb-2 text-2xl font-bold md:text-3xl text-primary-50">Prices</p>
      <div className="flex py-3 w-full border-b-[1px] border-b-primary-300">
        <p className="w-1/3 leading-5 text-primary-50">Amount</p>
        <p className="w-1/3 leading-5 text-primary-50">Price</p>
        <p className="w-1/3 leading-5 text-primary-50">Date</p>
      </div>
      {selectedToken !== 'DAI' && (
        <ul role="list" className="overflow-y-auto w-full divide-y divide-primary-300">
          {trades?.map((trade, i) => (
            <li key={i} className="flex py-3">
              <p className="w-1/3 text-lg font-bold leading-5 text-primary-50">
                {trade.amount}
                <span className="text-xs font-medium text-primary-200"> {selectedToken}</span>
              </p>
              <p className="w-1/3 text-lg font-bold leading-5 text-primary-50">
                {trade.price}
                <span className="text-xs font-medium text-primary-200"> {selectedToken}/DAI</span>
              </p>
              <p className="w-1/3 text-xs leading-5 text-primary-200">{trade.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
