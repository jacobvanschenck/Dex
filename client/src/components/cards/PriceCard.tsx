import { useCallback, useEffect, useState } from 'react';
import { useDexStore } from '../../store';
import { getDexRead, getDexTradeEvents, Trade } from '../../utils';
import { PublicClient, pad } from 'viem';
import { TICKER } from '../../consts';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { SyncLoader } from 'react-spinners';
dayjs.extend(relativeTime);

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
                const date = dayjs(parseInt(l.args.date) * 1000).fromNow();
                return {
                  amount: l.args.amount?.toString(),
                  price: l.args.price?.toString(),
                  date,
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

  if (!trades || trades.length === 0)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <SyncLoader color={'#FEFCEA'} />
      </div>
    );

  return (
    <div className="flex flex-col justify-end items-start px-4 w-full">
      <div className="flex py-3 w-full border-b-[1px] border-b-primary-300">
        <p className="w-1/3 leading-5 text-primary-50">Amount</p>
        <p className="w-1/3 leading-5 text-primary-50">Price</p>
        <p className="w-1/3 leading-5 text-primary-50">Date</p>
      </div>
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
            <p className="w-1/3 leading-5 text-primary-200">{trade.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
