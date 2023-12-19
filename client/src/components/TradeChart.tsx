import { TokenType } from '../types';
import { AreaSeries, GradientDefs, HorizontalGridLines, LineSeries, XAxis, XYPlot, YAxis } from 'react-vis';
import { Trade, getDexRead, getDexTradeEvents } from '../utils';
import { useDexStore } from '../store';
import { useCallback, useEffect, useState } from 'react';
import { PublicClient, pad } from 'viem';
import { TICKER } from '../consts';

type TradeChartProps = {
  selectedToken: TokenType;
};

export default function TradeChart({ selectedToken }: TradeChartProps) {
  const publicClient = useDexStore((state) => state.publicClient);
  const [trades, setTrades] = useState<Array<Trade>>();
  const [data, setData] = useState<Array<{ x: number; y: number }>>();
  const [ticks, setTicks] = useState<Array<string>>();

  const getDex = useCallback(
    async (client: PublicClient) => {
      try {
        const dex = await getDexRead(client);
        if (dex) {
          const logs = await getDexTradeEvents(publicClient, dex);
          setTrades(logs.filter((log) => log.args.ticker === pad(TICKER[selectedToken], { dir: 'right' })));
        }
      } catch (err) {
        console.error(err);
      }
    },
    [selectedToken, publicClient],
  );

  useEffect(() => {
    if (!trades) return;
    const data = trades?.map((trade) => {
      return { x: parseInt(trade.args.tradeId) + 1, y: parseInt(trade.args.price) };
    });
    setData([...data]);
  }, [trades]);

  useEffect(() => {
    setTicks(
      trades?.map((trade) => {
        const date = new Date(parseInt(trade.args.date) * 1000).toLocaleDateString().split('/');
        return date[0] + '/' + date[1];
      }),
    );
  }, [trades]);

  console.log('data', data);
  console.log('ticks', ticks);

  useEffect(() => {
    if (!publicClient) return;
    getDex(publicClient);
  }, [getDex, publicClient]);

  if (!data) return null;

  return (
    <XYPlot yDomain={[0, Math.max(...data.map((datum) => datum.y))]} height={150} width={350}>
      <GradientDefs>
        <linearGradient id="myGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopOpacity={1} stopColor="rgba(243, 206, 73, 0.49)" />
          <stop offset="100%" stopOpacity={0} stopColor="rgba(243, 206, 73, 0.03)" />
        </linearGradient>
      </GradientDefs>
      <HorizontalGridLines style={{ stroke: '#394150', strokeDasharray: 4 }} tickTotal={3} />
      <XAxis tickFormat={(_, i) => ticks && ticks[i]} style={{ text: { stroke: '#E5E7EB', fontSize: '12px' } }} />
      <YAxis tickValues={[0, 10]} style={{ display: 'none' }} />
      <AreaSeries
        className="area-series-example"
        curve="curveNatural"
        data={data}
        color={'url(#myGradient)'}
        style={{
          stroke: 'none',
        }}
      />
      <LineSeries data={data} curve="curveNatural" style={{ stroke: '#E2B53E', fill: 'none' }} />
    </XYPlot>
  );
}
