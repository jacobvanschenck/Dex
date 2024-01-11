# Welcome to TsunamiTrades

![TsunamiTradesScreenShot](https://raw.githubusercontent.com/jacobvanschenck/Dex/master/GIFs/TsunamiTrades.png)

A **decentralised exchange** to create Market Orders and Limit Orders for ERC20 coins.

[Here is the app](https://dex-vs.netlify.app/) running on the **Sepolia Test Network**.

---

## Tech Stack ⚙️

[Solidity](https://soliditylang.org/) | [React](https://react.dev/) | [Hardhat](https://hardhat.org) | [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts) | [Viem](https://viem.sh/) | [ReCharts](https://recharts.org/en-US)

---

## Running Locally 💻

#### Clone Repo 📂

Start of by cloning this repo or downloading the zip file.
After that open up your terminal and run these commands:

```bash
cd /path_to_project/My-Dex/blockchain
pnpm install
```

Then you need to create an `.env` file in `/blockchain` for some values in `hardhat.config.ts`

```json
ETHERSCAN_API_KEY="API_KEY"
ALCHEMY_API_KEY="API_KEY"
SEPOLIA_PRIVATE_KEY="PRIVATE_KEY"
```

#### Setup Blockchain 🔗

Next step is to get the Hardhat blockchain node running locally

```bash
cd /path_to_project/My-Dex/blockchain
pnpm hardhat node
```

Then test, compile and deploy the contracts

```bash
pnpm test
pnpm compile

pnpm hardhat run scripts/deploy_mocks.ts --network localhost        # this deploys the ERC20 tokens
pnpm hardhat run scripts/seed_wallet.ts --network localhost         # fund wallet with ERC20 tokens
pnpm hardhat run scripts/deploy_dex.ts --network localhost          # deploy dex using ERC20 tokens
```

#### Start Client 🌐

Finally get the client site running on localhost with the Hardhat node. We need to change a few things:

Open up `/client/src/utils.ts` and update the function `getPublicClent()` to this:

```typescript
export function getPublicClient() {
  return createPublicClient({
    chain: hardhat,
    transport: http("http://127.0.0.1:8545"),
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

---

## Features 📼

### Connects with Metamask

![ConnectToMetamask GIF](https://raw.githubusercontent.com/jacobvanschenck/Dex/master/GIFs/ConnectToMetamask.gif)

<p>&nbsp;</p>
<p>&nbsp;</p>

### Deposit and Withdraw | Shows dApp approving Dex contract to deposit and withdraw coins from wallet

![UseWallet GIF](https://raw.githubusercontent.com/jacobvanschenck/Dex/master/GIFs/UseWallet.gif)

<p>&nbsp;</p>
<p>&nbsp;</p>

### Create Limit Order

![CreateLimitOrder GIF](https://raw.githubusercontent.com/jacobvanschenck/Dex/master/GIFs/CreateLimitOrder.gif)

<p>&nbsp;</p>
<p>&nbsp;</p>

### Create Market Order | Shows trader filling in limit order and trade appearing on dApp

![CreateMarketOrder GIF](https://raw.githubusercontent.com/jacobvanschenck/Dex/master/GIFs/CreateMarketOrder.gif)

<p>&nbsp;</p>
<p>&nbsp;</p>

---

## Feedback 🤝

Do you have any suggestions for code or additional features you'd like to see implemented? Hit me up on [Twitter](https://twitter.com/JacobVanSchenck)

### Contract Deployments 🔗

#### Sepolia Testnet

- **Dex**: `0xe3B970200669bB3258886e0a8E5c97504d93ba31` [Etherscan](https://sepolia.etherscan.io/address/0xe3B970200669bB3258886e0a8E5c97504d93ba31)
- **Dai**: `0x2487fC2B8c785E57D9752ABFD8E9a6696DEebb1C` [Etherscan](https://sepolia.etherscan.io/address/0x2487fC2B8c785E57D9752ABFD8E9a6696DEebb1C)
- **Bat**: `0x0DcC9f27a42a19d9b4dd3cf25A591DB030aB820A` [Etherscan](https://sepolia.etherscan.io/address/0x0DcC9f27a42a19d9b4dd3cf25A591DB030aB820A)
- **Rep**: `0x58dfd3A9C6Cf1072E5A3A9D800E2aD47dD0327c8` [Etherscan](https://sepolia.etherscan.io/address/0x58dfd3A9C6Cf1072E5A3A9D800E2aD47dD0327c8)
- **Zrx**: `0x6b65E74E68CaF377636e439B71f7D62d71F53cAe` [Etherscan](https://sepolia.etherscan.io/address/0x6b65E74E68CaF377636e439B71f7D62d71F53cAe)
