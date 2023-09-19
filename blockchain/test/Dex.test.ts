import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { parseEther } from 'ethers'
import { ethers } from 'hardhat'

const SIDE = {
    BUY: 0,
    SELL: 1,
}

const [DAI, BAT, REP, ZRX] = ['DAI', 'BAT', 'REP', 'ZRX'].map((ticker) =>
    ethers.encodeBytes32String(ticker)
)

describe('Dex', function () {
    async function deployDexFixture() {
        const [owner, trader1, trader2] = await ethers.getSigners()

        const Dex = await ethers.getContractFactory('Dex')
        const dex = await Dex.deploy()

        const [Dai, Bat, Rep, Zrx] = await Promise.all([
            ethers.getContractFactory('Dai'),
            ethers.getContractFactory('Bat'),
            ethers.getContractFactory('Rep'),
            ethers.getContractFactory('Zrx'),
        ])
        const [dai, bat, rep, zrx] = await Promise.all([
            await Dai.deploy(),
            await Bat.deploy(),
            await Rep.deploy(),
            await Zrx.deploy(),
        ])

        await Promise.all([
            dex.addToken(DAI, dai.getAddress()),
            dex.addToken(BAT, bat.getAddress()),
            dex.addToken(REP, rep.getAddress()),
            dex.addToken(ZRX, zrx.getAddress()),
        ])

        const amount = ethers.parseEther('1000')

        const seedTokenBalance = async (
            token: typeof dai,
            trader: HardhatEthersSigner
        ) => {
            await token.faucet(trader, amount)
            await token.connect(trader).approve(dex.getAddress(), amount)
        }

        await Promise.all(
            [dai, bat, rep, zrx].map((token) =>
                seedTokenBalance(token, trader1)
            )
        )

        await Promise.all(
            [dai, bat, rep, zrx].map((token) =>
                seedTokenBalance(token, trader2)
            )
        )

        return { dex, dai, owner, trader1, trader2 }
    }

    describe('Deployment', function () {
        it('should have correct tokens', async function () {
            const { dex, dai } = await loadFixture(deployDexFixture)
            const tokenList = await dex.getTokens()
            const daiAddress = await dai.getAddress()

            expect(tokenList[0][0]).to.eq(ethers.encodeBytes32String('DAI'))
            expect(tokenList[0][1]).to.eq(daiAddress)
            expect(tokenList.length).to.eq(4)
        })
    })

    describe('Deposit', function () {
        it('should deposit tokens', async function () {
            const { dex, trader1 } = await loadFixture(deployDexFixture)
            const amount = ethers.parseEther('100')

            await dex.connect(trader1).deposit(amount, DAI)

            const balance = await dex.traderBalances(trader1, DAI)
            expect(balance.toString()).to.eq(amount)
        })

        it('should NOT deposit tokens if token does not exist', async function () {
            const { dex, trader1 } = await loadFixture(deployDexFixture)
            await expect(
                dex
                    .connect(trader1)
                    .deposit(
                        ethers.parseEther('100'),
                        ethers.encodeBytes32String('NOT_A_TOKEN')
                    )
            ).to.be.revertedWith('this token does not exist')
        })
    })

    describe('Withdraw', function () {
        it('should withdraw tokens', async function () {
            const { dex, dai, trader1 } = await loadFixture(deployDexFixture)
            const amount = ethers.parseEther('100')
            await dex.connect(trader1).deposit(amount, DAI)

            await dex.connect(trader1).withdraw(amount, DAI)
            const balanceDex = await dex.traderBalances(trader1.address, DAI)
            const balanceDai = await dai.balanceOf(trader1.address)

            expect(balanceDex).to.eq(0)
            expect(balanceDai).to.eq(ethers.parseEther('1000'))
        })

        it('should NOT withdraw tokens if token does not exist', async function () {
            const { dex, trader1 } = await loadFixture(deployDexFixture)
            await expect(
                dex
                    .connect(trader1)
                    .withdraw(
                        ethers.parseEther('100'),
                        ethers.encodeBytes32String('NOT_A_TOKEN')
                    )
            ).to.be.revertedWith('this token does not exist')
        })

        it('should NOT withdraw tokens if balance is too low', async function () {
            const { dex, trader1 } = await loadFixture(deployDexFixture)
            await dex.connect(trader1).deposit(ethers.parseEther('100'), DAI)
            await expect(
                dex.connect(trader1).withdraw(ethers.parseEther('1000'), DAI)
            ).to.be.revertedWith('balance too low')
        })
    })

    describe('Limit Orders', function () {
        it('should create limit order', async function () {
            const { dex, trader1, trader2 } = await loadFixture(
                deployDexFixture
            )
            await dex.connect(trader1).deposit(ethers.parseEther('100'), DAI)
            await dex
                .connect(trader1)
                .createLimitOrder(REP, ethers.parseEther('10'), 10, SIDE.BUY)

            let buyOrders = await dex.getOrders(REP, SIDE.BUY)
            let sellOrders = await dex.getOrders(REP, SIDE.SELL)
            expect(buyOrders.length).to.eq(1)
            expect(buyOrders[0].trader).to.eq(trader1.address)
            expect(buyOrders[0].ticker).to.eq(REP)
            expect(buyOrders[0].price).to.eq(10)
            expect(buyOrders[0].amount).to.eq(ethers.parseEther('10'))
            expect(sellOrders.length).to.eq(0)

            await dex.connect(trader2).deposit(ethers.parseEther('200'), DAI)
            await dex
                .connect(trader2)
                .createLimitOrder(REP, ethers.parseEther('10'), 11, SIDE.BUY)

            buyOrders = await dex.getOrders(REP, SIDE.BUY)
            sellOrders = await dex.getOrders(REP, SIDE.SELL)

            expect(buyOrders.length).to.eq(2)
            expect(buyOrders[0].trader).to.eq(trader2.address)
            expect(buyOrders[1].trader).to.eq(trader1.address)
            expect(sellOrders.length).to.eq(0)

            await dex
                .connect(trader2)
                .createLimitOrder(REP, ethers.parseEther('10'), 9, SIDE.BUY)

            buyOrders = await dex.getOrders(REP, SIDE.BUY)
            sellOrders = await dex.getOrders(REP, SIDE.SELL)

            expect(buyOrders.length).to.eq(3)
            expect(buyOrders[0].trader).to.eq(trader2.address)
            expect(buyOrders[1].trader).to.eq(trader1.address)
            expect(buyOrders[2].trader).to.eq(trader2.address)
            expect(sellOrders.length).to.eq(0)
        })

        it('should NOT create limit order if token does not exist', async function () {
            const { dex, trader1 } = await loadFixture(deployDexFixture)
            await expect(
                dex
                    .connect(trader1)
                    .createLimitOrder(
                        ethers.encodeBytes32String('NOT_A_TOKEN'),
                        ethers.parseEther('1000'),
                        10,
                        SIDE.BUY
                    )
            ).to.be.revertedWith('this token does not exist')
        })

        it('should NOT create limit order if token is DAI', async function () {
            const { dex, trader1 } = await loadFixture(deployDexFixture)
            await expect(
                dex
                    .connect(trader1)
                    .createLimitOrder(
                        DAI,
                        ethers.parseEther('1000'),
                        10,
                        SIDE.BUY
                    )
            ).to.be.revertedWith('cannot trade DAI')
        })

        it('should NOT create limit order if token balance is too low', async function () {
            const { dex, trader1 } = await loadFixture(deployDexFixture)
            await dex.connect(trader1).deposit(ethers.parseEther('99'), REP)
            await expect(
                dex
                    .connect(trader1)
                    .createLimitOrder(
                        REP,
                        ethers.parseEther('100'),
                        10,
                        SIDE.SELL
                    )
            ).to.be.revertedWith('token balance too low')
        })

        it('should NOT create limit order if trader DAI balance is too low', async function () {
            const { dex, trader1 } = await loadFixture(deployDexFixture)
            await dex.connect(trader1).deposit(ethers.parseEther('99'), DAI)
            await expect(
                dex
                    .connect(trader1)
                    .createLimitOrder(
                        REP,
                        ethers.parseEther('10'),
                        10,
                        SIDE.BUY
                    )
            ).to.be.revertedWith('DAI balance too low')
        })
    })

    describe('Market Orders', function () {
        it('should create market order', async function () {
            const { dex, trader1, trader2 } = await loadFixture(
                deployDexFixture
            )
            await dex.connect(trader1).deposit(ethers.parseEther('100'), REP)
            await dex.connect(trader2).deposit(ethers.parseEther('100'), DAI)

            await dex
                .connect(trader1)
                .createLimitOrder(REP, parseEther('10'), 10, SIDE.SELL)
            await dex
                .connect(trader2)
                .createMarketOrder(REP, parseEther('5'), SIDE.BUY)

            const orders = await dex.getOrders(REP, SIDE.SELL)
            expect(orders[0].filled).to.eq(ethers.parseEther('5'))

            const balance = await Promise.all([
                dex.traderBalances(trader1.address, DAI),
                dex.traderBalances(trader1.address, REP),
                dex.traderBalances(trader2.address, DAI),
                dex.traderBalances(trader2.address, REP),
            ])
            expect(balance[0]).to.eq(ethers.parseEther('50'))
            expect(balance[1]).to.eq(ethers.parseEther('95'))
            expect(balance[2]).to.eq(ethers.parseEther('50'))
            expect(balance[3]).to.eq(ethers.parseEther('5'))
        })

        it('should NOT create market order if token does not exist', async function () {
            const { dex, trader1 } = await loadFixture(deployDexFixture)
            await expect(
                dex
                    .connect(trader1)
                    .createMarketOrder(
                        ethers.encodeBytes32String('NOT_A_TOKEN'),
                        ethers.parseEther('1000'),
                        SIDE.BUY
                    )
            ).to.be.revertedWith('this token does not exist')
        })

        it('should NOT create market order if token is DAI', async function () {
            const { dex, trader1 } = await loadFixture(deployDexFixture)
            await expect(
                dex
                    .connect(trader1)
                    .createMarketOrder(DAI, ethers.parseEther('1000'), SIDE.BUY)
            ).to.be.revertedWith('cannot trade DAI')
        })

        it('should NOT create market order if trader token balance is too low', async function () {
            const { dex, trader1 } = await loadFixture(deployDexFixture)
            await dex.connect(trader1).deposit(ethers.parseEther('99'), REP)
            await expect(
                dex
                    .connect(trader1)
                    .createMarketOrder(REP, ethers.parseEther('100'), SIDE.SELL)
            ).to.be.revertedWith('token balance too low')
        })

        it('should NOT create market order if trader DAI balance is too low', async function () {
            const { dex, trader1 } = await loadFixture(deployDexFixture)
            await dex.connect(trader1).deposit(ethers.parseEther('100'), REP)
            await dex
                .connect(trader1)
                .createLimitOrder(REP, parseEther('100'), 10, SIDE.SELL)

            await expect(
                dex
                    .connect(trader1)
                    .createMarketOrder(REP, ethers.parseEther('100'), SIDE.BUY)
            ).to.be.revertedWith('dai balance too low')
        })
    })
})
