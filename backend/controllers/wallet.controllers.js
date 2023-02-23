const Wallet = require('../models/Wallet');
const Account = require('../models/Account.js');
const Owner = require('../models/Owner');
const WalletService = require('../service/WalletServices');

const walletService = new WalletService();


const getWallet = async (req , res) => {
    // #swagger.tags = ['wallet']
    const wallet = await Wallet.findById(req.params.id)

    res.json(wallet);
};

const getWallets = async (req , res) => {
    // #swagger.tags = ['Wallet']

    const wallets = await Wallet.find();

    res.json(wallets);
};

const crateWallet = async (req, res) => {
    // #swagger.tags = ['wallet']

    const owner = await Owner.findById(req.body.owner);
    const newWallet = new Wallet({owner: owner, name: req.body.name});

    const wallet = await newWallet.save();

    res.json(wallet);
}

const deleteWallet = async (req, res) => {
    // #swagger.tags = ['wallet']
    const wallet = await Wallet.findByIdAndDelete(req.params.id);
    if (wallet != null) {
        await Account.deleteMany({wallet: wallet._id});
        res.json({'message': 'Wallet Deleted'});

    } else
        res.json({'message': 'Wallet not exist'});
}

const getWalletWithAccount = async (req, res) => {
    // #swagger.tags = ['wallet']

    const wallet = await Wallet.findById(req.params.id);

    const accounts = await walletService.getAccountsWithBalance(wallet);

    res.json({wallet: wallet, accounts: accounts });
}

const updateWallet = async (req, res) => {
    // #swagger.tags = ['wallet']
    const result = await Wallet.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false});

    res.json(result);
};

module.exports = {
    getWallet,
    crateWallet,
    getWallets,
    deleteWallet,
    getWalletWithAccount,
    updateWallet
}

