import { useEffect, useState } from 'react';
import { isMobile } from '../../utils';
import QRCode from 'react-qr-code';
import { mobileWallets } from '../../consts';
import { SyncLoader } from 'react-spinners';
import { useDexStore } from '../../store';

export default function WalletConnectActionSheet() {
  const [loading, setLoading] = useState(false);
  const [uri, setUri] = useState<string | null>(null);
  const [walletUrl, setWalletUrl] = useState<string>();

  const provider = useDexStore((state) => state.provider);
  const account = useDexStore((state) => state.account);
  const disconnect = useDexStore((state) => state.disconnect);
  const connect = useDexStore((state) => state.connect);

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
        <>
          <p>{account}</p>
          <button onClick={() => disconnect()}>disconnect</button>
        </>
      ) : loading ? (
        <SyncLoader size="15px" color="#fefcea" speedMultiplier={0.85} />
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
