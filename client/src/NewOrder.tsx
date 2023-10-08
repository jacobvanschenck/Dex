import { FormEvent, useState } from 'react';
import { SIDE } from './App';

type NewOrderProps = {
  createLimitOrder: (amount: string, price: string, side: number) => void;
  createMarketOrder: (amount: string, side: number) => void;
};

const TYPE = {
  LIMIT: 'LIMIT',
  MARKET: 'MARKET',
};

function NewOrder({ createMarketOrder, createLimitOrder }: NewOrderProps) {
  const [order, setOrder] = useState({
    type: TYPE.LIMIT,
    side: SIDE.BUY,
    amount: '',
    price: '',
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (order.type === TYPE.MARKET) {
      createMarketOrder(order.amount, order.side);
    } else {
      createLimitOrder(order.amount, order.price, order.side);
    }
  };

  return (
    <div id="orders" className="">
      <h2 className="">New Order</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="">
          <label htmlFor="type" className="">
            Type
          </label>
          <div className="">
            <div id="type" className="">
              <button
                type="button"
                className={``}
                onClick={() =>
                  setOrder((order) => ({
                    ...order,
                    type: TYPE.LIMIT,
                  }))
                }
              >
                Limit
              </button>
              <button
                type="button"
                className={``}
                onClick={() =>
                  setOrder((order) => ({
                    ...order,
                    type: TYPE.MARKET,
                  }))
                }
              >
                Market
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <label htmlFor="side" className="">
            Side
          </label>
          <div className="">
            <div id="side" className="" role="group">
              <button
                type="button"
                className={``}
                onClick={() =>
                  setOrder((order) => ({
                    ...order,
                    side: SIDE.BUY,
                  }))
                }
              >
                Buy
              </button>
              <button
                type="button"
                className={``}
                onClick={() =>
                  setOrder((order) => ({
                    ...order,
                    side: SIDE.SELL,
                  }))
                }
              >
                Sell
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <label className="" htmlFor="order-amount">
            Amount
          </label>
          <div className="">
            <input
              type="text"
              className=""
              id="order-amount"
              onChange={({ target: { value } }) =>
                setOrder((order) => ({
                  ...order,
                  amount: value,
                }))
              }
            />
          </div>
        </div>
        {order.type === TYPE.MARKET ? null : (
          <div className="">
            <label className="" htmlFor="order-amount">
              Price
            </label>
            <div className="">
              <input
                type="text"
                className=""
                id="order-price"
                onChange={({ target: { value } }) =>
                  setOrder((order) => ({
                    ...order,
                    price: value,
                  }))
                }
              />
            </div>
          </div>
        )}
        <div className="">
          <button type="submit" className="">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewOrder;
