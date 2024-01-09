import { useCallback, useEffect } from 'react';
import { getDexBalance, getEthereumProvider, getTokenBalance } from '../../utils';
import { useDexStore } from '../../store';
import { Address, PublicClient, createWalletClient, custom, pad } from 'viem';
import { sepolia } from 'viem/chains';
import useEthereumProviderEvents from '../../hooks/useEthereumProviderEvents';
import { BAT_ADDRESS, DAI_ADDRESS, REP_ADDRESS, TICKER, ZRX_ADDRESS } from '../../consts';
import { BAT, DAI, REP, ZRX } from '../../types';
import { displayToast } from '../Notifications';

export async function getBalances(address: Address, publicClient: PublicClient) {
  if (!address) return null;
  try {
    const ethBalance = await publicClient.getBalance({ address });
    const daiBalance = await getTokenBalance(DAI_ADDRESS, address, publicClient);
    const batBalance = await getTokenBalance(BAT_ADDRESS, address, publicClient);
    const repBalance = await getTokenBalance(REP_ADDRESS, address, publicClient);
    const zrxBalance = await getTokenBalance(ZRX_ADDRESS, address, publicClient);

    const dexDaiBalance = await getDexBalance(address, pad(TICKER[DAI], { dir: 'right' }), publicClient);
    const dexBatBalance = await getDexBalance(address, pad(TICKER[BAT], { dir: 'right' }), publicClient);
    const dexRepBalance = await getDexBalance(address, pad(TICKER[REP], { dir: 'right' }), publicClient);
    const dexZrxBalance = await getDexBalance(address, pad(TICKER[ZRX], { dir: 'right' }), publicClient);

    const balances = {
      ETH: ethBalance,
      DAI: daiBalance,
      BAT: batBalance,
      REP: repBalance,
      ZRX: zrxBalance,
      DEX_DAI: dexDaiBalance,
      DEX_BAT: dexBatBalance,
      DEX_REP: dexRepBalance,
      DEX_ZRX: dexZrxBalance,
    };
    return balances;
  } catch (err) {
    console.error(err);
    displayToast('Something went wrong while getting balances', { type: 'error' });
    return null;
  }
}

export default function WalletProvider() {
  const publicClient = useDexStore((state) => state.publicClient);
  const provider = useDexStore((state) => state.provider);
  const setProvider = useDexStore((state) => state.setProvider);
  const setAccount = useDexStore((state) => state.setAccount);
  const setBalances = useDexStore((state) => state.setBalances);
  const disconnect = useDexStore((state) => state.disconnect);
  const setWalletClient = useDexStore((state) => state.setWalletClient);

  const wcConnected = JSON.parse(window.localStorage.getItem('dex.wc_connected') || 'null');
  const metaConnected = JSON.parse(window.localStorage.getItem('dex.metamask_connected') || 'null');

  useEthereumProviderEvents(provider, {
    onConnect: async (provider) => {
      console.log('WC Provider: connect event');
      const address = provider.accounts[0] as Address;
      setAccount(address);
      setBalances(await getBalances(address, publicClient));
    },
    onAccountsChanged: async (provider) => {
      console.log('WC Provider: accountsChanged event');
      const address = provider.accounts[0] as Address;
      setAccount(address);
      setBalances(await getBalances(address, publicClient));
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
      setBalances(await getBalances(address, publicClient));
    },
    onAccountsChanged: async (provider) => {
      console.log('MetaMask Provider: accountsChanged event');
      const address = provider.selectedAddress as Address;
      console.log(address);
      setAccount(address);
      setBalances(await getBalances(address, publicClient));
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
        setBalances(await getBalances(account as Address, publicClient));
      }
      if (metaConnected) {
        const client = createWalletClient({
          chain: sepolia,
          transport: custom(window.ethereum),
        });
        const [account] = await client.requestAddresses();
        setAccount(account);
        setBalances(await getBalances(account, publicClient));
        setWalletClient(client);
      }
      setProvider(provider);
    } catch (err) {
      console.error(err);
      displayToast('Something went wrong connecting your wallet, refresh and try again', { type: 'error' });
    }
  }, [setProvider, setBalances, publicClient, metaConnected, wcConnected, setAccount, setWalletClient]);

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
