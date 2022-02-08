const path = require("path");
const fs = require("fs")
const provider = require("@truffle/hdwallet-provider")
const secrets = JSON.parse(fs.readFileSync('.secrets.json').toString().trim())

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  // Configure your compilers

  networks: {
    kovan: {
      provider: () => 
        new provider(
          secrets.privateKey,
          secrets.infuraApi,
          0,
          1
        ),
      network_id: 42
    },

    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // Match any network id
    }
  },

  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};
