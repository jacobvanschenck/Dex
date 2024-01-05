import { useEffect } from 'react';

export default function useEthereumProviderEvents<TProvider>(
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
      provider.removeListener('connect', onConnect);
      provider.removeListener('accountsChanged', onAccountsChanged);
      provider.removeListener('disconnect', onDisconnect);
    };
  }, [provider, onConnect, onAccountsChanged, onDisconnect]);
}
