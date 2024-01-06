import { useEffect, useState } from 'react';
import { isMobile } from '../../utils';
import QRCode from 'react-qr-code';
import { mobileWallets } from '../../consts';
import { useDexStore } from '../../store';
import Avatar from '../Avatar';
import { PrimaryButton } from '../shared/PrimaryButton';
import { Address, createWalletClient, custom } from 'viem';
import { sepolia } from 'viem/chains';

export default function WalletConnectActionSheet() {
  const [uri, setUri] = useState<string | null>(null);
  const [walletUrl, setWalletUrl] = useState<string>();

  const provider = useDexStore((state) => state.provider);
  const account = useDexStore((state) => state.account);
  const setAccount = useDexStore((state) => state.setAccount);
  const setProvider = useDexStore((state) => state.setProvider);
  const balance = useDexStore((state) => state.balance);
  const disconnect = useDexStore((state) => state.disconnect);
  const setActionSheetOpen = useDexStore((state) => state.setActionSheetOpen);

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
            <PrimaryButton
              action={() => {
                disconnect();
                setActionSheetOpen(false);
              }}
            >
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
        <div className="flex flex-col gap-8 items-center">
          <p className="text-lg font-bold">Choose your wallet app</p>
          <div className="flex gap-4 justify-between">
            <div className="hidden flex-col gap-2 items-center md:flex stroke-neutral-400">
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                  />
                </svg>
                <p className="text-neutral-400">Desktop</p>
              </div>
              <div className="p-8 rounded-3xl border-2 border-neutral-400">
                <button
                  onClick={async () => {
                    const client = createWalletClient({
                      chain: sepolia,
                      transport: custom(window.ethereum),
                    });
                    const [address] = await client.requestAddresses();
                    setAccount(address);
                    setProvider(window.ethereum);
                    window.localStorage.setItem('dex.metamask_connected', JSON.stringify(true));
                  }}
                  className="flex flex-col gap-1 items-center px-4"
                >
                  <div className="overflow-hidden rounded-2xl w-fit">
                    <img src={mobileWallets[0].icon} width="60" height="60" alt={`${mobileWallets[0].name} app icon`} />
                  </div>
                  <p className="">{mobileWallets[0].name}</p>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center stroke-neutral-400">
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
                <p className="text-neutral-400">Mobile</p>
              </div>
              <div className="p-8 rounded-3xl border-2 border-neutral-400">
                <div className="flex justify-around px-4 w-full h-full">
                  {mobileWallets.map((wallet, i) => {
                    return (
                      <button
                        onClick={async () => {
                          setWalletUrl(wallet.url);
                          if (!provider) return;
                          await provider.connect();
                          window.localStorage.setItem('dex.wc_connected', JSON.stringify(true));
                          setAccount(provider.accounts[0] as Address);
                          setProvider(provider);
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
