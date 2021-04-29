const Owner = require('../models/Owner');
const Account = require('../models/Account');
const Wallet = require('../models/Wallet');

const web3Service = require("../service/Web3Service");

const buyEth = async (req , res) => {
    const account = await Account.findById(req.params.id);
    console.log(req.params.id);
    console.log(account);
    const wallet = await Wallet.findById(account.wallet);
    const ownerAccount = await Account.findOne({wallet: wallet.owner});
  //  const transaction = await web3Service.send(ownerAccount.address,account.address, req.body.amount);
    const transaction =
        await web3Service.sendPersonal(
            ownerAccount.address,
            account.address,
            req.body.amount,
            ownerAccount.password
        );

    res.json(transaction);
};

const sellEth = async (req, res) => {

    const account = await Account.findById(req.params.id);
    console.log(account);
    const wallet = await Wallet.findById(account.wallet);
    const ownerAccount = await Account.findOne({wallet: wallet.owner});
    const transaction =
        await web3Service.sendPersonal(
            account.address,
            ownerAccount.address,
            req.body.amount,
            account.password
        );

    res.json(transaction);
};

module.exports = {
    buyEth,
    sellEth
}
