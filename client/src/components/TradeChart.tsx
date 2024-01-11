import { getDexRead, getDexTradeEvents, getRelativeDateFromBlockTimestamp } from '../utils';
import { useDexStore } from '../store';
import { useCallback, useEffect, useState } from 'react';
import { PublicClient, pad } from 'viem';
import { DEX_ADDRESS, TICKER } from '../consts';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts';
import { DAI } from '../types';
import { displayToast } from './Notifications';
import { DexAbi } from '../contracts/DexAbi';

export default function TradeChart() {
  const selectedToken = useDexStore((state) => state.selectedToken);
  const publicClient = useDexStore((state) => state.publicClient);
  const [data, setData] = useState<Array<{ x: number; price: number; date: string }>>();

  const getDexTrades = useCallback(
    async (client: PublicClient) => {
      try {
        const dex = await getDexRead(client);
        if (dex) {
          const logs = await getDexTradeEvents(publicClient, dex);
          setData(
            logs
              .filter((log) => log.args.ticker === pad(TICKER[selectedToken], { dir: 'right' }))
              .map((log) => {
                return {
                  x: Number(log.args.tradeId) + 1,
                  price: Number(log.args.price),
                  date: getRelativeDateFromBlockTimestamp(log.args.date),
                };
              }),
          );
        }
      } catch (err) {
        console.error(err);
        displayToast('Something went wrong while getting trade events', { type: 'error' });
      }
    },
    [selectedToken, publicClient],
  );

  // Fetch Trades
  useEffect(() => {
    if (!publicClient) return;
    getDexTrades(publicClient);
  }, [getDexTrades, publicClient]);

  // Watch for new Trades
  useEffect(() => {
    const unwatch = publicClient.watchContractEvent({
      address: DEX_ADDRESS,
      abi: DexAbi,
      eventName: 'NewTrade',
      onLogs: () => getDexTrades(publicClient),
    });

    return () => unwatch();
  });

  if (selectedToken === DAI)
    return (
      <div className="flex flex-col gap-2 justify-center items-center w-full h-full text-center min-h-[7.5rem] md:min-h-[10rem]">
        <h2 className="text-xl font-bold md:text-2xl">DAI cannot be traded</h2>
        <p className="px-14 text-sm">Choose a different token to view orders, prices and charts</p>
      </div>
    );

  if (!data) return null;

  return (
    <div className="w-full h-[7.5rem] md:grow md:h-[10rem]">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="myGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopOpacity={1} stopColor="rgba(243, 206, 73, 0.49)" />
              <stop offset="100%" stopOpacity={0} stopColor="rgba(243, 206, 73, 0.1)" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="5 5" style={{ stroke: '#FDF9C9', strokeOpacity: 0.3 }} vertical={false} />
          <XAxis
            dataKey="date"
            axisLine={false}
            mirror
            tickLine={false}
            tickMargin={20}
            style={{ fontSize: '0.75rem' }}
          />
          <YAxis dataKey="price" mirror axisLine={false} hide tickCount={4} />
          <Area type="monotone" dataKey="price" stroke="#E2B53E" strokeWidth={2} fill="url(#myGradient)" />
          <Tooltip
            animationDuration={500}
            animationEasing="linear"
            contentStyle={{ borderRadius: '1rem', background: '#212936' }}
            labelStyle={{ color: '#F9FAFB' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
