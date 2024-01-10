import { useCallback, useEffect, useState } from 'react';
import { Order, getDexRead, getRelativeDateFromBlockTimestamp } from '../../utils';
import { useDexStore } from '../../store';
import Pill from '../Pill';
import { MY_ORDERS, ALL_ORDERS, SIDE, TICKER } from '../../consts';
import { PublicClient, formatEther, pad } from 'viem';
import { SyncLoader } from 'react-spinners';

const BUY = 'BUY';
const SELL = 'SELL';

export default function OrderCard() {
  const selectedToken = useDexStore((state) => state.selectedToken);
  const publicClient = useDexStore((state) => state.publicClient);
  const account = useDexStore((state) => state.account);

  const [orders, setOrders] = useState<{ BUY: Array<Order>; SELL: Array<Order> }>();
  const [side, setSide] = useState<typeof BUY | typeof SELL>(BUY);
  const [orderFilter, setOrderFilter] = useState(ALL_ORDERS);

  const getOrders = useCallback(
    async (client: PublicClient) => {
      if (!selectedToken) return;
      const dex = await getDexRead(client);
      const buyOrders = await dex.read.getOrders([pad(TICKER[selectedToken], { dir: 'right' }), SIDE.BUY]);
      const sellOrders = await dex.read.getOrders([pad(TICKER[selectedToken], { dir: 'right' }), SIDE.SELL]);
      setOrders({
        BUY: buyOrders.map((o) => {
          return {
            amount: formatEther(o.amount),
            filled: o.filled.toString(),
            date: getRelativeDateFromBlockTimestamp(o.date),
            price: o.price.toString(),
            trader: o.trader,
          };
        }),
        SELL: sellOrders.map((o) => {
          return {
            amount: formatEther(o.amount),
            filled: o.filled.toString(),
            date: getRelativeDateFromBlockTimestamp(o.date),
            price: o.price.toString(),
            trader: o.trader,
          };
        }),
      });
    },
    [selectedToken],
  );

  useEffect(() => {
    if (!publicClient) return;
    getOrders(publicClient);
  }, [publicClient, getOrders]);

  if (!orders)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <SyncLoader color={'#FEFCEA'} />
      </div>
    );

  return (
    <div className="flex flex-col w-full">
      <p className="pb-2 text-2xl font-bold md:text-3xl text-primary-50">Orders</p>
      <div className="flex gap-2">
        <div className="flex gap-1 p-1 grow bg-primary-800 rounded-[50px]">
          <Pill
            caption={
              <p>
                <span className="md:hidden">All</span>
                <span className="hidden md:block">All Orders</span>
              </p>
            }
            isSelected={orderFilter === ALL_ORDERS}
            onClick={() => setOrderFilter(ALL_ORDERS)}
          />
          <Pill
            caption={
              <p>
                <span className="md:hidden">Mine</span>
                <span className="hidden md:block">My Orders</span>
              </p>
            }
            isSelected={orderFilter === MY_ORDERS}
            onClick={() => setOrderFilter(MY_ORDERS)}
          />
        </div>
        <div className="flex gap-1 p-1 grow bg-primary-800 rounded-[50px]">
          <Pill caption="Buy" isSelected={side === BUY} onClick={() => setSide(BUY)} />
          <Pill caption="Sell" isSelected={side === SELL} onClick={() => setSide(SELL)} />
        </div>
      </div>
      <div className="flex py-3 w-full whitespace-nowrap border-b-[1px] border-b-primary-300">
        <p className="w-1/4 leading-5 text-primary-50">Amount</p>
        <p className="w-1/4 leading-5 text-primary-50">Filled</p>
        <p className="w-1/4 leading-5 text-primary-50">Price</p>
        <p className="w-1/4 leading-5 text-primary-50">Date</p>
      </div>
      {selectedToken !== 'DAI' ? (
        <ul role="list" className="overflow-y-auto w-full divide-y divide-primary-300">
          {orders[side]
            .filter((o) => orderFilter === ALL_ORDERS || o.trader === account)
            .map((order, i) => (
              <li key={i} className="flex items-baseline py-3">
                <p className="w-1/4 text-lg font-bold leading-5 text-primary-50">
                  {order.amount}
                  <span className="text-xs font-medium text-primary-200"> {selectedToken}</span>
                </p>
                <p className="w-1/4 text-lg font-bold leading-5 text-primary-50">
                  {order.filled}
                  <span className="text-xs font-medium text-primary-200"> {selectedToken}</span>
                </p>
                <p className="w-1/4 text-lg font-bold leading-5 text-primary-50">
                  {order.price}
                  <span className="text-xs font-medium text-primary-200"> {selectedToken}/DAI</span>
                </p>
                <p className="w-1/4 text-xs leading-5 text-primary-200">{order.date}</p>
              </li>
            ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center w-full h-full md:items-end md:pb-20">
          Choose a different token
        </div>
      )}
    </div>
  );
}
