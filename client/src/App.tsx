import { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import Wallet from './Wallet';
import NewOrder from './NewOrder';
import AllOrders from './AllOrders';
import MyOrders from './MyOrders';
import AllTrades from './AllTrades';
import { Address, PublicClient, hexToString } from 'viem';
import { sepolia } from 'viem/chains';
import {
  getPublicClient,
  getDexReadWrite,
  DexContract,
  TokenContract,
  TokenStructType,
  Order,
  getTokenReadWrite,
  getWalletClient,
  getDexTradeEvents,
  Trade,
} from './utils';

type AppProps = {
  accounts: Array<Address>;
};

export type Orders = {
  buy: Array<Order>;
  sell: Array<Order>;
};

export type Balances = {
  tokenDex: bigint;
  tokenWallet: bigint;
};

export const SIDE = {
  BUY: 0,
  SELL: 1,
};

function App({ accounts }: AppProps) {
  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
  const [dex, setDex] = useState<DexContract | null>(null);
  const [tokens, setTokens] = useState<Array<TokenStructType> | null>(null);
  const [selectedToken, setSelectedToken] = useState<TokenStructType | null>(null);
  const [contracts, setContracts] = useState<Record<string, TokenContract> | null>(null);
  const [orders, setOrders] = useState<Orders | null>(null);
  const [balances, setBalances] = useState<Balances | null>(null);
  const [trades, setTrades] = useState<Array<Trade> | null>(null);
  // const [listener, setListener] = useState(undefined);

  console.log('orders', orders);
  console.log('balances', balances);
  console.log('tokens', tokens);
  console.log('selectedToken', selectedToken);
  console.log('contracts', contracts);
  console.log('trades', trades);

  // const listenToTrades = (token) => {
  //   const tradeIds = new Set();
  //   setTrades([]);
  //   const listener = contracts.dex.events
  //     .NewTrade({
  //       filter: { ticker: web3.utils.fromAscii(token.ticker) },
  //       fromBlock: 0,
  //     })
  //     .on("data", (newTrade) => {
  //       if (tradeIds.has(newTrade.returnValues.tradeId)) return;
  //       tradeIds.add(newTrade.returnValues.tradeId);
  //       setTrades((trades) => [...trades, newTrade.returnValues]);
  //     });
  //   setListener(listener);
  // };

  const connectPublicClient = useCallback(async () => {
    if (publicClient) return;
    const pClient = getPublicClient();
    const wClient = getWalletClient();
    const dexReadWrite = await getDexReadWrite(pClient, wClient);
    const rawTokens = await dexReadWrite.read.getTokens();
    const tokensWithName = rawTokens.map((tokenStruct) => {
      return { ...tokenStruct, name: hexToString(tokenStruct.ticker).replace(/[^ -~]+/g, '') };
    });
    const tokenContracts = {};
    tokensWithName.map((token) =>
      getTokenReadWrite(pClient, wClient, token.tokenAddress).then((res) =>
        Object.assign(tokenContracts, { [token.name]: res }),
      ),
    );
    const logs = await getDexTradeEvents(pClient, dexReadWrite);
    setPublicClient(pClient);
    setDex(dexReadWrite);
    setTokens(tokensWithName);
    setSelectedToken(tokensWithName[0]);
    setContracts(tokenContracts);
    setTrades(logs);
  }, [getPublicClient, getDexReadWrite, getDexTradeEvents, getTokenReadWrite, publicClient]);

  const getOrders = useCallback(async () => {
    if (!selectedToken || !dex) return;
    const buyOrders = await dex.read.getOrders([selectedToken.ticker, SIDE.BUY]);
    const sellOrders = await dex.read.getOrders([selectedToken.ticker, SIDE.SELL]);
    setOrders({ buy: buyOrders, sell: sellOrders });
  }, [selectedToken, dex]);

  const getBalances = useCallback(
    async (account: Address) => {
      if (!dex || !selectedToken || !contracts) return;
      const tokenDex = await dex.read.traderBalances([account, selectedToken.ticker]);
      const tokenWallet = await contracts[selectedToken.name].read.balanceOf([account]);
      setBalances({ tokenDex, tokenWallet });
    },
    [dex, selectedToken, contracts],
  );

  const deposit = useCallback(
    async (amount: number) => {
      if (!selectedToken || !dex || !contracts) return;
      await contracts[selectedToken.name].write.approve([dex.address, BigInt(amount)], {
        account: accounts[0],
        chain: sepolia,
      });
      await dex.write.deposit([BigInt(amount), selectedToken.ticker], { account: accounts[0], chain: sepolia });
    },
    [selectedToken, dex, contracts],
  );

  const withdraw = useCallback(
    async (amount: number) => {
      if (!dex || !selectedToken) return;
      await dex.write.withdraw([BigInt(amount), selectedToken.ticker], { account: accounts[0], chain: sepolia });
    },
    [dex, selectedToken],
  );

  const createMarketOrder = useCallback(
    async (amount: string, side: number) => {
      if (!dex || !selectedToken) return;
      await dex.write.createMarketOrder([selectedToken.ticker, BigInt(amount), side], {
        account: accounts[0],
        chain: sepolia,
      });
    },
    [dex, selectedToken],
  );

  const createLimitOrder = useCallback(
    async (amount: string, price: string, side: number) => {
      if (!dex || !selectedToken) return;
      await dex.write.createLimitOrder([selectedToken.ticker, BigInt(amount), BigInt(price), side], {
        account: accounts[0],
        chain: sepolia,
      });
    },
    [dex, selectedToken],
  );

  useEffect(() => {
    connectPublicClient();
    getOrders();
    getBalances(accounts[0]);
  }, [connectPublicClient, getOrders, accounts]);

  if (!orders || !dex || !selectedToken || !tokens || !balances) return <p>Loading...</p>;

  return (
    <div id="app" className="">
      <Header dex={dex} tokens={tokens} selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
      <main>
        <div className="">
          <div className="">
            <Wallet selectedToken={selectedToken} balances={balances} deposit={deposit} withdraw={withdraw} />
            {selectedToken.name !== 'DAI' ? (
              <NewOrder createLimitOrder={createLimitOrder} createMarketOrder={createMarketOrder} />
            ) : null}
          </div>
          {selectedToken.name !== 'DAI' ? (
            <div className="">
              <AllTrades trades={trades} />
              <AllOrders orders={orders} />
              <MyOrders
                orders={{
                  buy: orders.buy.filter((order) => order.trader.toLowerCase() === accounts[0].toLowerCase()),
                  sell: orders.sell.filter((order) => order.trader.toLowerCase() === accounts[0].toLowerCase()),
                }}
              />
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
