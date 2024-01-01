import { useEffect, useState } from 'react';
import { isMobile } from '../../utils';
import QRCode from 'react-qr-code';
import { mobileWallets } from '../../consts';
import { useDexStore } from '../../store';
import Avatar from '../Avatar';
import { PrimaryButton } from '../shared/PrimaryButton';

export default function WalletConnectActionSheet() {
  const [uri, setUri] = useState<string | null>(null);
  const [walletUrl, setWalletUrl] = useState<string>();

  const provider = useDexStore((state) => state.provider);
  const account = useDexStore((state) => state.account);
  const balance = useDexStore((state) => state.balance);
  const disconnect = useDexStore((state) => state.disconnect);
  const connect = useDexStore((state) => state.connect);

  console.log(balance);

  useEffect(() => {
    if (!provider) return;
    const onDisplayUri = (uri: string) => {
      const url = walletUrl + encodeURIComponent(uri);
      if (isMobile()) {
        window.location.assign(url);
      } else {
        setUri(url);
      }
    };

    provider.on('display_uri', onDisplayUri);
    return () => {
      provider.removeListener('display_uri', onDisplayUri);
    };
  }, [walletUrl, provider]);

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {account ? (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 items-center">
            <Avatar username={account} size={60} />
            <p className="text-lg font-bold md:block">{account.slice(0, 4) + '...' + account.slice(-4)}</p>
            <p className="text-sm text-neutral-400">{balance} SepoliaETH</p>
          </div>
          <div className="flex gap-4">
            <PrimaryButton action={() => navigator.clipboard.writeText(account)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"
                />
              </svg>
              Copy Address
            </PrimaryButton>
            <PrimaryButton action={() => disconnect()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
              Disconnect
            </PrimaryButton>
          </div>
        </div>
      ) : uri ? (
        <>
          <p>Scan to connect your wallet</p>
          <QRCode value={uri} bgColor="#121826" fgColor="#fefcea" />
        </>
      ) : (
        <>
          <p>Choose your wallet app</p>
          <div className="flex justify-around px-4 w-full h-full">
            {mobileWallets.map((wallet, i) => {
              return (
                <button
                  onClick={() => {
                    setWalletUrl(wallet.url);
                    connect();
                  }}
                  className="flex flex-col gap-1 items-center"
                  key={i}
                >
                  <div className="overflow-hidden rounded-2xl w-fit">
                    <img src={wallet.icon} width="60" height="60" alt={`${wallet.name} app icon`} />
                  </div>
                  <p className="">{wallet.name}</p>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
