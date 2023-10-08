import React from 'react';
import { Orders } from './App';

type MyOrdersProps = {
  orders: Orders;
};

function MyOrders({ orders }: MyOrdersProps) {
  const renderList = (orders, side, className) => {
    return (
      <>
        <table className={``}>
          <thead>
            <tr className="">
              <th>{side}</th>
            </tr>
            <tr>
              <th>amount/filled</th>
              <th>price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  {order.amount}/{order.filled}
                </td>
                <td>{order.price}</td>
                <td>{new Date(Number(order.date) * 1000).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <div id="order-list" className="">
      <h2 className="">My orders</h2>
      <div className="">
        <div className="">{renderList(orders.buy, 'Buy', 'order-list-buy')}</div>
        <div className="">{renderList(orders.sell, 'Sell', 'order-list-sell')}</div>
      </div>
    </div>
  );
}

export default MyOrders;
