const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");

const BestXV1 = artifacts.require("BestX");
const BestXV2 = artifacts.require("BestXV2");

module.exports = async function (deployer, network, accounts) {
  const existing = await BestXV1.deployed();
  const instance = await upgradeProxy(existing.address, BestXV2, { deployer });
  console.log("Upgraded", instance.address);

  /** =================================================================================== */
  /** ============= UNCOMMENT THIS TO RUN SCRIPTS ONLY, LEAVE OUT FOR TESTS ============= */
  /** ==== MODIFY WITHDRAWALL() IN BESTXV2 TO TAKE NO FEE TO PROVE MEMORY CONSISTENCY === */

  // await instance.deposit({ value: 10000 });
  // await instance.withdrawAll();
  // const platformBalance = await instance.contractBalance();
  // console.log("platformBalance", platformBalance.toNumber());

  /** =================================================================================== */
};