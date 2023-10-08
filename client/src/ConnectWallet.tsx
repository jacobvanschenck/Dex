import { PrimaryButton } from './components/PrimaryButton'

export type ConnectWalletProps = {
    connectWallet: () => Promise<void>
}

export default function ConnectWallet({ connectWallet }: ConnectWalletProps) {
    return (
        <div className="flex flex-col items-center pt-12 w-screen h-screen bg-slate-50">
            <PrimaryButton action={connectWallet}>
                Connect Metamask
            </PrimaryButton>
        </div>
    )
}
