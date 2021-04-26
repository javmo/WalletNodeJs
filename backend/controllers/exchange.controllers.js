const Owner = require('../models/Owner');
const Account = require('../models/Account');
const Wallet = require('../models/Wallet');

const web3Service = require("../service/Web3Service");

const buyEth = async (req , res) => {

    const account = await Account.findOne({address: req.body.address});
    const wallet = await Wallet.findById(account.wallet);
    const owner = await Owner.findById(wallet.owner);
    const transaction = await web3Service.send(owner.address,account.address, req.body.amount);

    res.json(transaction);
};

module.exports = {
    buyEth
}
