import { ethers } from 'hardhat'

async function main() {
    const wallletToSeed = '0xAc91476f88D41B422EaFA77d63cAfC39c45253d9'

    const Dai = await ethers.getContractAt(
        'Dai',
        '0x2487fC2B8c785E57D9752ABFD8E9a6696DEebb1C'
    )
    const Bat = await ethers.getContractAt(
        'Bat',
        '0x0DcC9f27a42a19d9b4dd3cf25A591DB030aB820A'
    )
    const Rep = await ethers.getContractAt(
        'Rep',
        '0x58dfd3A9C6Cf1072E5A3A9D800E2aD47dD0327c8'
    )
    const Zrx = await ethers.getContractAt(
        'Zrx',
        '0x6b65E74E68CaF377636e439B71f7D62d71F53cAe'
    )

    console.log(
        '\n',
        '='.repeat(80),
        '\n  Seeding Wallets with Tokens\n',
        '='.repeat(80),
        '\n'
    )

    await Dai.faucet(wallletToSeed, ethers.parseEther('1000000'))
    await Bat.faucet(wallletToSeed, ethers.parseEther('1000000'))
    await Rep.faucet(wallletToSeed, ethers.parseEther('1000000'))
    await Zrx.faucet(wallletToSeed, ethers.parseEther('1000000'))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
