import { Orders } from './App';
import { Order } from './utils';

type MyOrdersProps = {
  orders: Orders;
};

function MyOrders({ orders }: MyOrdersProps) {
  const renderList = (orders: Array<Order>, side: string) => {
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
              <tr key={Number(order.id)}>
                <td>
                  {Number(order.amount)}/{Number(order.filled)}
                </td>
                <td>{Number(order.price)}</td>
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
        <div className="">{renderList(orders.buy, 'Buy')}</div>
        <div className="">{renderList(orders.sell, 'Sell')}</div>
      </div>
    </div>
  );
}

export default MyOrders;
