import { Orders } from './App';
import { Order } from './utils';

type AllOrdersProps = {
  orders: Orders;
};

function AllOrders({ orders }: AllOrdersProps) {
  const renderList = (orders: Array<Order>, side: string, className: string) => {
    return (
      <>
        <table className={``}>
          <thead>
            <tr className="">
              <th>{side}</th>
            </tr>
            <tr>
              <th>amount</th>
              <th>price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={Number(order.id)}>
                <td>{Number(order.amount - order.filled)}</td>
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
    <div className="">
      <h2 className="">All orders</h2>
      <div className="">
        <div className="">{renderList(orders.buy, 'Buy', '')}</div>
        <div className="">{renderList(orders.sell, 'Sell', '')}</div>
      </div>
    </div>
  );
}

export default AllOrders;
