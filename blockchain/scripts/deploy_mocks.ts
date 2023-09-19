import { ethers } from 'hardhat'

async function main() {
    console.log(
        '\n',
        '='.repeat(80),
        '\n  Deploying Tokens\n',
        '='.repeat(80),
        '\n'
    )
    const [owner] = await ethers.getSigners()

    const Dai = await ethers.deployContract('Dai')
    const Bat = await ethers.deployContract('Bat')
    const Rep = await ethers.deployContract('Rep')
    const Zrx = await ethers.deployContract('Zrx')

    await Dai.waitForDeployment()
    await Bat.waitForDeployment()
    await Rep.waitForDeployment()
    await Zrx.waitForDeployment()

    const tokenList = [
        { name: 'Dai', contract: Dai },
        { name: 'Bat', contract: Bat },
        { name: 'Rep', contract: Rep },
        { name: 'Zrx', contract: Zrx },
    ]

    console.table(
        tokenList.map((token) => {
            return { token: token.name, address: token.contract.target }
        })
    )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
