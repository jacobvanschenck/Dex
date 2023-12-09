import { useCallback, useEffect, useState } from 'react';
import { getWCEthereumProvider, isMobile } from '../../utils';
import Provider from '@walletconnect/ethereum-provider';
import QRCode from 'react-qr-code';
import { mobileWallets } from '../../consts';
import { SyncLoader } from 'react-spinners';

export default function WalletConnectActionSheet() {
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<Provider | undefined>();
  const [uri, setUri] = useState<string | undefined>();
  const [walletUrl, setWalletUrl] = useState<string | undefined>();
  const [account, setAccount] = useState<string | undefined>();

  const connect = useCallback(async () => {
    setLoading(true);
    try {
      const provider = await getWCEthereumProvider();
      setProvider(provider);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!provider) return;
    provider.on('display_uri', (uri) => {
      const url = walletUrl + encodeURIComponent(uri);
      if (isMobile()) {
        window.location.assign(url);
      } else {
        setUri(url);
        setLoading(false);
      }
    });
    provider.on('connect', () => {
      setAccount(provider.accounts[0]);
    });
    provider.connect();
  }, [provider]);

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {account ? (
        <p>{account}</p>
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
            {mobileWallets.map((wallet, i) => (
              <button
                onClick={() => {
                  connect();
                  setWalletUrl(wallet.url);
                }}
                className="flex flex-col gap-1 items-center"
                key={i}
              >
                <div className="overflow-hidden rounded-2xl w-fit">
                  <img src={wallet.icon} width="60" height="60" alt={`${wallet.name} app icon`} />
                </div>
                <p className="">{wallet.name}</p>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
