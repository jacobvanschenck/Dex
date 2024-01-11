// import Provider from '@walletconnect/ethereum-provider';
import Provider from '@walletconnect/ethereum-provider';
import { useEffect } from 'react';

export default function useEthereumProviderEvents<TProvider extends Provider | null>(
  provider: TProvider,
  {
    onConnect,
    onAccountsChanged,
    onDisconnect,
  }: {
    onConnect: (provider: NonNullable<TProvider>) => Promise<void>;
    onAccountsChanged: (provider: NonNullable<TProvider>) => Promise<void>;
    onDisconnect: (provider: NonNullable<TProvider>) => void;
  },
) {
  //Add listeners
  useEffect(() => {
    if (!provider) return;

    provider.on('connect', () => onConnect(provider));
    provider.on('accountsChanged', () => onAccountsChanged(provider));
    provider.on('disconnect', () => onDisconnect(provider));

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      provider.removeListener('connect', onConnect);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      provider.removeListener('accountsChanged', onAccountsChanged);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      provider.removeListener('disconnect', onDisconnect);
    };
  }, [provider, onConnect, onAccountsChanged, onDisconnect]);
}
