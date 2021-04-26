const Account = require('../models/Account');
const web3Service = require("../service/Web3Service");

class WalletServices {

    getAccountsWithBalance (wallet) {
        const accounts = Account.find({wallet: wallet._id});

        const accountsBalances = accounts.forEach(async account => {
            const balance = await web3Service.getBalanceOf(account.address);
            return {account: account.address, balance: balance };
        })
        return accountsBalances;
    }

}