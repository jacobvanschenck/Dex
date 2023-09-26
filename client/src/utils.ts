import { DexAbi } from './contracts/WalletAbi'
import {
    Address,
    GetContractReturnType,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    custom,
    getContract,
    http,
    publicActions,
} from 'viem'
import { sepolia } from 'viem/chains'

export type WalletContract = GetContractReturnType<
    typeof WalletAbi,
    PublicClient,
    WalletClient
>

export type Transfer = {
    id: bigint
    amount: bigint
    to: Address
    approvals: bigint
    sent: boolean
}

export const getWallet = async (
    walletClient: WalletClient,
    publicClient: PublicClient
) => {
    const wallet = getContract({
        address: '0xa5B0B594475a91D21015bf124AffcAa958668312',
        abi: WalletAbi,
        walletClient,
        publicClient,
    })
    return wallet
}

export function getPublicClient() {
    return createPublicClient({
        chain: sepolia,
        transport: http(
            `https://eth-sepolia.g.alchemy.com/v2/${
                process.env.NETLIFY === 'true'
                    ? process.env.VITE_ALCHEMY_API_KEY
                    : import.meta.env.VITE_ALCHEMY_API_KEY
            }`
        ),
    })
}

export function getWalletClient() {
    return createWalletClient({
        chain: sepolia,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        transport: custom(window.ethereum),
    }).extend(publicActions)
}
