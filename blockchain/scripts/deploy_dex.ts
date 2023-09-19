import { ethers } from 'hardhat'

const daiAddress = '0x2487fC2B8c785E57D9752ABFD8E9a6696DEebb1C'
const batAddress = '0x0DcC9f27a42a19d9b4dd3cf25A591DB030aB820A'
const repAddress = '0x58dfd3A9C6Cf1072E5A3A9D800E2aD47dD0327c8'
const zrxAddress = '0x6b65E74E68CaF377636e439B71f7D62d71F53cAe'

const [DAI, BAT, REP, ZRX] = ['DAI', 'BAT', 'REP', 'ZRX'].map((ticker) =>
    ethers.encodeBytes32String(ticker)
)

async function main() {
    console.log(
        '\n',
        '='.repeat(80),
        '\n  Deploying Dex\n',
        '='.repeat(80),
        '\n'
    )
    const dex = await ethers.deployContract('Dex')
    await dex.waitForDeployment()

    console.log(`Dex deployed to ${dex.target}`)

    console.log(
        '\n',
        '='.repeat(80),
        '\n  Adding Tokens\n',
        '='.repeat(80),
        '\n'
    )

    await dex.addToken(DAI, daiAddress)
    await dex.addToken(BAT, batAddress)
    await dex.addToken(REP, repAddress)
    await dex.addToken(ZRX, zrxAddress)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
