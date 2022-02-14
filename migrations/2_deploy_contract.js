const Dex = artifacts.require("Dex.sol");

const [DAI, BAT, REP, ZRX] = ['DAI', 'BAT', 'REP', 'ZRX']
  .map(ticker => web3.utils.fromAscii(ticker));

const daiAddress = '0x1528F3FCc26d13F7079325Fb78D9442607781c8C'
const batAddress = '0x1f1f156E0317167c11Aa412E3d1435ea29Dc3cCE'
const repAddress = '0x8c9e6c40d3402480ACE624730524fACC5482798c'
const zrxAddress = '0xccb0F4Cf5D3F97f4a55bb5f5cA321C3ED033f244'

const SIDE = {
  BUY: 0,
  SELL: 1
};

module.exports = async function(deployer, _network) {
  await deployer.deploy(Dex)
  const dex = await Dex.deployed()

  await dex.addToken(DAI, daiAddress)
  await dex.addToken(BAT, batAddress)
  await dex.addToken(REP, repAddress)
  await dex.addToken(ZRX, zrxAddress)
  
};