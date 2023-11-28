export default function TradeCard() {
  return (
    <div className="flex flex-col justify-end items-start">
      <p>TradeCard</p>
      <p>total balance</p>
      <p>1.0001 DAI</p>
      <div className="flex gap-4">
        <button>depost</button> <button>withdraw</button>
      </div>
    </div>
  );
}
