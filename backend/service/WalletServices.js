const Account = require('../models/Account.js');
const web3Service = require("../service/Web3Service");

class WalletServices {
    async getAccountsWithBalance (wallet) {
        const accounts = await Account.find({wallet: wallet.id});

        const accountsBalances = [];

        for (const account of accounts) {
            const balance = await web3Service.getBalanceOf(account.address);
            accountsBalances.push({account: account.address, balance: balance});
        }
        return accountsBalances;
    }

}

module.exports = WalletServices;