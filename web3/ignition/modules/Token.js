const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DeployModule = buildModule("TokenModule", (m) => {
  const marketPlace = m.contract("myNFTstore");
  return marketPlace;
});

module.exports = DeployModule;