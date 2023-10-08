import { Trade } from './utils';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

type AllTradesProps = {
  trades: Array<Trade> | null;
};

function AllTrades({ trades }: AllTradesProps) {
  const renderList = (trades: Array<Trade>, className: string) => {
    return (
      <>
        <table className={`table table-striped trade-list mb-0 ${className}`}>
          <thead>
            <tr>
              <th>amount</th>
              <th>price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={Number(trade.tradeId)}>
                <td>{trade.amount.toString()}</td>
                <td>{trade.price.toString()}</td>
                <td>{new Date(Number(trade.date) * 1000).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  const renderChart = (trades: Array<Trade>) => {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={trades}>
          <CartesianGrid stroke="#000000" />
          <XAxis
            dataKey="date"
            tickFormatter={(dateStr) => {
              const date = new Date(parseInt(dateStr) * 1000);
              return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            }}
          />
          <Tooltip />
          <YAxis />
          <Line type="monotone" dataKey="price" stroke="#741cd7" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="">
      <h2 className="">All trades</h2>
      <div className="">
        <div className="">
          {trades && renderChart(trades)}
          {trades && renderList(trades, '')}
        </div>
      </div>
    </div>
  );
}

export default AllTrades;
