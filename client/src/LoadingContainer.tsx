import React, { useState, useEffect, useCallback } from 'react'
import App from './App'
import { getPublicClient, getWalletClient } from './utils'
import { Address, PublicClient } from 'viem'
import ConnectWallet from './ConnectWallet'

function LoadingContainer() {
    const [publicClient, setPublicClient] = useState<PublicClient | null>(null)
    const [accounts, setAccounts] = useState<Array<Address> | null>(null)

    // useEffect(() => {
    //     const init = async () => {
    //         const web3 = await getWeb3()
    //         const contracts = await getContracts(web3)
    //         const accounts = await web3.eth.getAccounts()
    //         setWeb3(web3)
    //         setContracts(contracts)
    //         setAccounts(accounts)
    //     }
    //     init()
    // }, [])

    const connectWallet = useCallback(async () => {
        const walletClient = getWalletClient()
        const publicClient = getPublicClient()
        const accounts = await walletClient.requestAddresses()
        setAccounts(accounts)
        setPublicClient(publicClient)
        setAccounts(accounts)
    }, [])

    if (!accounts || !publicClient) {
        return <ConnectWallet connectWallet={connectWallet} />
    }

    // return <App accounts={accounts} publicClient={publicClient} />
}

export default LoadingContainer
