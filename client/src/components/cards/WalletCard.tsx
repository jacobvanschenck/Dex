import { DEPOSIT, WITHDRAW, BALANCE } from '../../types';
import DepositCard from './DepositCard';
import { useState } from 'react';
import WithdrawCard from './WithdrawCard';
import BalanceCard from './BalanceCard';

export type WalletCardType = typeof DEPOSIT | typeof WITHDRAW | typeof BALANCE;

export default function WalletCard() {
  const [display, setDisplay] = useState<WalletCardType>(BALANCE);

  function renderWallet(display: WalletCardType) {
    switch (display) {
      case DEPOSIT:
        return <DepositCard onBack={() => setDisplay(BALANCE)} />;
      case WITHDRAW:
        return <WithdrawCard onBack={() => setDisplay(BALANCE)} />;
      case BALANCE:
        return <BalanceCard setDisplay={setDisplay} />;
    }
  }

  return renderWallet(display);
}
