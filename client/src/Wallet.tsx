import { FormEvent, useState } from 'react';
import { TokenStructType } from './utils';
import { Balances } from './App';

type WalletProps = {
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
  selectedToken: TokenStructType;
  balances: Balances;
};

const DIRECTION = {
  WITHDRAW: 'WITHDRAW',
  DEPOSIT: 'DEPOSIT',
};

function Wallet({ deposit, withdraw, selectedToken, balances }: WalletProps) {
  const [direction, setDirection] = useState(DIRECTION.DEPOSIT);
  const [amount, setAmount] = useState(0);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (direction === DIRECTION.DEPOSIT) {
      deposit(amount);
    } else {
      withdraw(amount);
    }
  };

  return (
    <div id="wallet" className="">
      <h2 className="card-title">Wallet</h2>

      <h3>Token balance for {selectedToken.name}</h3>
      <div className="">
        <p className="">Wallet</p>
        <p className="" id="wallet">
          {balances.tokenWallet.toString()} wei
        </p>
      </div>
      <div className="">
        <p className="">Dex</p>
        <p className="" id="wallet">
          {balances.tokenDex.toString()} wei
        </p>
      </div>
      <h3>Transfer {selectedToken.name}</h3>
      <form id="transfer" onSubmit={(e) => onSubmit(e)}>
        <div className="">
          <label htmlFor="direction" className="">
            Direction
          </label>
          <div className="">
            <div id="direction" className="" role="group">
              <button type="button" className={``} onClick={() => setDirection(DIRECTION.DEPOSIT)}>
                Deposit
              </button>
              <button type="button" className={``} onClick={() => setDirection(DIRECTION.WITHDRAW)}>
                Withdraw
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <label htmlFor="amount" className="">
            Amount
          </label>
          <div className="">
            <div className="">
              <input id="amount" type="number" className="" onChange={(e) => setAmount(Number(e.target.value))} />
              <div className="">
                <span className="">{selectedToken.name}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <button type="submit" className="">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Wallet;
