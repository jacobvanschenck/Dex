import { useCallback, useEffect } from 'react';
import { getEthereumProvider } from '../../utils';
import { useDexStore } from '../../store';
import { Address, formatEther } from 'viem';

export default function WalletProvider() {
  const publicClient = useDexStore((state) => state.publicClient);
  const provider = useDexStore((state) => state.provider);
  const setProvider = useDexStore((state) => state.setProvider);
  const account = useDexStore((state) => state.account);
  const setBalance = useDexStore((state) => state.setBalance);
  const setAccount = useDexStore((state) => state.setAccount);
  const reconnect = useDexStore((state) => state.reconnect);
  const disconnect = useDexStore((state) => state.disconnect);

  const getProvider = useCallback(async () => {
    try {
      const provider = await getEthereumProvider();
      setProvider(provider);
    } catch (err) {
      console.error(err);
    }
  }, [setProvider]);

  const connectFunc = useCallback(async () => {
    if (!provider) return;
    await reconnect();
  }, [provider, reconnect]);

  const disconnectFunc = useCallback(async () => {
    if (!provider) return;
    await disconnect();
  }, [provider, disconnect]);

  // Init EthereumProvider
  useEffect(() => {
    if (!provider) {
      getProvider();
    }
  }, [provider, getProvider]);

  useEffect(() => {
    if (!provider || !!account) return;
    connectFunc();
  }, [connectFunc, account, provider]);

  //Add listeners
  useEffect(() => {
    if (!provider) return;
    const onConnect = async () => {
      console.log('connect event');
      const address = provider.accounts[0] as Address;
      setAccount(address);
      const balance = await publicClient.getBalance({ address });
      setBalance(formatEther(balance).slice(0, 5));
    };

    const onAccountsChanged = async () => {
      console.log('accountsChanged event');
      const address = provider.accounts[0] as Address;
      setAccount(address);
      const balance = await publicClient.getBalance({ address });
      setBalance(formatEther(balance).slice(0, 5));
    };

    const onDisconnect = () => {
      console.log('disconnect event');
      disconnectFunc();
    };

    provider.on('connect', onConnect);
    provider.on('accountsChanged', onAccountsChanged);
    provider.on('disconnect', onDisconnect);

    return () => {
      provider.removeListener('connect', onConnect);
      provider.removeListener('accountsChanged', onAccountsChanged);
      provider.removeListener('disconnect', onDisconnect);
    };
  }, [publicClient, setBalance, provider, disconnectFunc, getProvider, setAccount]);

  return null;
}
