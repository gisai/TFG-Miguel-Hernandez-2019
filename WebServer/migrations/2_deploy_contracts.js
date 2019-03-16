var Gestion = artifacts.require("./Gestion.sol");

module.exports = function(deployer) {
	deployer.deploy(Gestion);
};