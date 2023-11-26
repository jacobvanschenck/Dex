export default function WalletCard() {
  return (
    <div className="flex flex-col flex-1 justify-end items-start py-8 px-10 w-full bg-gradient-to-br rounded-[50px] from-primary-500 from-70% to-primary-300">
      <p>total balance</p>
      <p>1.0001 DAI</p>
      <div className="flex gap-4">
        <button>depost</button> <button>withdraw</button>
      </div>
    </div>
  );
}
