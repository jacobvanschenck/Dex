# MyDex Contract

## Running Locally 💻

#### Clone Repo 📂

Start of by cloning this repo or downloading the zip file.
After that open up your terminal and run these commands:

```bash
cd /path_to_project/My-Dex/blockchain
pnpm install
cd ../client
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
