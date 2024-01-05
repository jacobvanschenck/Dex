import { useCallback, useEffect } from 'react';
import { getEthereumProvider } from '../../utils';
import { useDexStore } from '../../store';
import { Address, createWalletClient, custom, formatEther } from 'viem';
import { sepolia } from 'viem/chains';
import useEthereumProviderEvents from '../../hooks/useEthereumProviderEvents';

export default function WalletProvider() {
  const publicClient = useDexStore((state) => state.publicClient);
  const provider = useDexStore((state) => state.provider);
  const setProvider = useDexStore((state) => state.setProvider);
  const setAccount = useDexStore((state) => state.setAccount);
  const setBalance = useDexStore((state) => state.setBalance);
  const disconnect = useDexStore((state) => state.disconnect);
  const setWalletClient = useDexStore((state) => state.setWalletClient);

  const wcConnected = JSON.parse(window.localStorage.getItem('dex.wc_connected') ?? '');
  const metaConnected = JSON.parse(window.localStorage.getItem('dex.metamask_connected') ?? '');

  useEthereumProviderEvents(provider, {
    onConnect: async (provider) => {
      console.log('WC Provider: connect event');
      const address = provider.accounts[0] as Address;
      setAccount(address);
      const balance = await publicClient.getBalance({ address });
      setBalance(formatEther(balance).slice(0, 5));
    },
    onAccountsChanged: async (provider) => {
      console.log('WC Provider: accountsChanged event');
      const address = provider.accounts[0] as Address;
      setAccount(address);
      const balance = await publicClient.getBalance({ address });
      setBalance(formatEther(balance).slice(0, 5));
    },
    onDisconnect: () => {
      console.log('WC Provider: disconnect event');
      disconnectFunc();
    },
  });

  useEthereumProviderEvents(window.ethereum, {
    onConnect: async (provider) => {
      console.log('MetaMask Provider: connect event');
      const address = provider.selectedAddress as Address;
      setAccount(address);
      const balance = await publicClient.getBalance({ address });
      setBalance(formatEther(balance).slice(0, 5));
    },
    onAccountsChanged: async (provider) => {
      console.log('MetaMask Provider: accountsChanged event');
      const address = provider.selectedAddress as Address;
      console.log(address);
      setAccount(address);
      const balance = await publicClient.getBalance({ address });
      setBalance(formatEther(balance).slice(0, 5));
    },
    onDisconnect: () => {
      console.log('MetaMask Provider: disconnect event');
      disconnectFunc();
    },
  });

  const getProvider = useCallback(async () => {
    try {
      const provider = await getEthereumProvider();
      if (wcConnected) {
        const [account] = await provider.enable();
        setAccount(account as Address);
      }
      if (metaConnected) {
        const client = createWalletClient({
          chain: sepolia,
          transport: custom(window.ethereum),
        });
        const [account] = await client.requestAddresses();
        setAccount(account);
        setWalletClient(client);
      }
      setProvider(provider);
    } catch (err) {
      console.error(err);
    }
  }, [setProvider, metaConnected, wcConnected, setAccount, setWalletClient]);

  const disconnectFunc = useCallback(async () => {
    if (!provider) return;
    await disconnect();
  }, [provider, disconnect]);

  // Init WC EthereumProvider
  useEffect(() => {
    if (!provider) {
      getProvider();
    }
  }, [provider, getProvider]);

  return null;
}
