import { useCallback, useEffect } from 'react';
import { getEthereumProvider } from '../../utils';
import { useDexStore } from '../../store';

export default function WalletProvider() {
  const provider = useDexStore((state) => state.provider);
  const setProvider = useDexStore((state) => state.setProvider);
  const account = useDexStore((state) => state.account);
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
  }, []);

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
  }, [provider]);

  useEffect(() => {
    if (!provider || !!account) return;
    connectFunc();
  }, [connectFunc, account, provider]);

  //Add listeners
  useEffect(() => {
    if (!provider) return;
    const onConnect = () => {
      console.log('connect event');
      setAccount(provider.accounts[0]);
    };

    const onAccountsChanged = () => {
      console.log('accountsChanged event');
      setAccount(provider.accounts[0]);
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
  }, [provider, disconnectFunc, getProvider]);

  return null;
}
