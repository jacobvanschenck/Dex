# Welcome to My Dex

![MyDexScreenShot](https://raw.githubusercontent.com/jacobvanschenck/Dex/master/MyDex.png)

A **trading platform** to create Market Orders and Limit Orders for ERC20 coins.

Here is the app running on the [Kovan network](https://dex-vs.netlify.app/)

---

## Tech Stack ⚙️

Solidity | React | [Truffle](https://trufflesuite.com/) | [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts) | [Bootstrap](https://getbootstrap.com/) | [ReCharts](https://recharts.org/en-US)

---

## Install 💾

Start of by cloning this repo or downloading the zip file.
After that open up your terminal and run these commands:

```
cd ProjectFolder
npm install
```

### Run Truffle Blockchain 🔗

Next step is to get the Truffle blockchain running locally

```
cd ProjectFolder
truffle develop
```

Then inside of the `truffle(develop)` terminal run:

```
migrate --reset
```

### Start Client 🌐

Finally get the client site running on localhost.
Open a new Terminal window and run:

```
cd client/
npm run start
```

Head over to `http://localhost:3000` and start using MyDex!

> Note: Make sure to add the Ganache network to your Metamask

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

-   **Dex**: `0xe3B970200669bB3258886e0a8E5c97504d93ba31`
-   **Dai**: `0x2487fC2B8c785E57D9752ABFD8E9a6696DEebb1C`
-   **Bat**: `0x0DcC9f27a42a19d9b4dd3cf25A591DB030aB820A`
-   **Rep**: `0x58dfd3A9C6Cf1072E5A3A9D800E2aD47dD0327c8`
-   **Zrx**: `0x6b65E74E68CaF377636e439B71f7D62d71F53cAe`
