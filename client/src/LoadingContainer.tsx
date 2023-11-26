import { useState, useCallback } from 'react';
import { getPublicClient, getWalletClient } from './utils';
import { Address, PublicClient } from 'viem';
import ConnectWallet from './ConnectWallet';
import App from './App';

function LoadingContainer() {
  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
  const [accounts, setAccounts] = useState<Array<Address> | null>(null);

  const connectWallet = useCallback(async () => {
    const walletClient = getWalletClient();
    const publicClient = getPublicClient();
    const accounts = await walletClient.requestAddresses();
    setAccounts(accounts);
    setPublicClient(publicClient);
    setAccounts(accounts);
  }, []);

  // if (!accounts || !publicClient) {
  //   return <ConnectWallet connectWallet={connectWallet} />;
  // }

  return <App accounts={accounts} />;
}

export default LoadingContainer;
