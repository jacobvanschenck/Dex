# Welcome to TsunamiTrades

![TsunamiTradesScreenShot](https://raw.githubusercontent.com/jacobvanschenck/Dex/master/TsunamiTrades.png)

A **decentralised exchange** to create Market Orders and Limit Orders for ERC20 coins.

[Here is the app](https://dex-vs.netlify.app/) running on the **Sepolia Test Network**.

---

## Tech Stack ⚙️

[Solidity](https://soliditylang.org/) | [React](https://react.dev/) | [Hardhat](https://hardhat.org) | [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts) | [Viem](https://viem.sh/) | [ReCharts](https://recharts.org/en-US)

---

## Running 'Live' on Sepolia Test Network

Open a new Terminal window and run:

```bash
cd /path_to_project/MyDex/client/
pnpm install
pnpm start
```

Head over to `http://localhost:5173` and start using TsunamiTrades!

> Note: Make sure to switch on Test Networks on your Metamask

## Running Locally with Hardhat Node 💻

Finally get the client site running on localhost with the Hardhat node. We need to change a few things:

Open up `/client/src/utils.ts` and update the function `getPublicClent()` to this:

```typescript
export function getPublicClient() {
  return createPublicClient({
    chain: hardhat,
    transport: http('http://127.0.0.1:8545'),
  });
}
```

Next open up `/client/src/components/providers` and change **_both_** places `createWalletClient` is used to:

```typescript
const client = createWalletClient({
  chain: hardhat,
  transport: custom(provider),
});
```

Open a new Terminal window and run:

```bash
cd client/
pnpm install
pnpm start
```

Head over to `http://localhost:5173` and start using TsunamiTrades!

> Note: Make sure to update your Metamask to use the local network as well. [Check out step 5 in the MetaMask Developer docs](https://docs.metamask.io/wallet/how-to/get-started-building/run-devnet/)
