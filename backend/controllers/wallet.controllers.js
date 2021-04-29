const Wallet = require('../models/Wallet');
const Account = require('../models/Account');
const Owner = require('../models/Owner');
const WalletService = require('../service/WalletServices');

const walletService = new WalletService();


const getWallet = async (req , res) => {
    const wallet = await Wallet.findById(req.params.id)

    res.json(wallet);
};

const getWallets = async (req , res) => {

    const wallets = await Wallet.find();

    res.json(wallets);
};

const crateWallet = async (req, res) => {

    const owner = await Owner.findById(req.body.owner);
    const newWallet = new Wallet({owner: owner, name: req.body.name});

    const wallet = await newWallet.save();

  /*  const  account = web3Service.createAccount();
    await new Account({
        wallet: wallet.id,
        address: account.address,
        privateKey: account.privateKey
    }).save();*/
    res.json(wallet);
}

const deleteWallet = async (req, res) => {
    const wallet = await Wallet.findByIdAndDelete(req.params.id);
    if (wallet != null) {
        await Account.deleteMany({wallet: wallet._id});
        res.json({'message': 'Wallet Deleted'});

    } else
        res.json({'message': 'Wallet not exist'});
}

const getWalletWithAccount = async (req, res) => {

    const wallet = await Wallet.findById(req.params.id);

    const accounts = await walletService.getAccountsWithBalance(wallet);

    res.json({wallet: wallet, accounts: accounts });
}

const updateWallet = async (req, res) => {
    const result = await Wallet.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false});

    res.json(result);
};


/*const createSong = async (req, res) => {
    // levanta del post el json que se le envia con los campos name y description
    // console.log(req);
    const newSong = new Song({
        title: req.body.title,
        genre: req.body.genre,
        // se graba la letra previo a grabar la cancion
        lyric: await new Lyric(req.body.lyric).save()
    });

    res.json(await newSong.save());
}

const getSong = async (req, res) => {
    const song = await Song.findById(req.params.id);
    if(song == null)
        res.json({title: '[SONG NOT FOUND]'});
    else
        res.json(song);
}


const deleteSong = async (req, res) => {
    const song = await Song.findByIdAndDelete(req.params.id);
    // tambien de elimina la letra
    await Lyric.findByIdAndDelete(song.lyric._id);
    res.json({'message': 'Song Deleted'});
}

const likeSongs = async (req, res) => {
    const songs = await Song.find( {title: {$regex: req.query.q, $options: 'i'}}).limit(5);
    res.json(songs);
};*/

module.exports = {
    getWallet,
    crateWallet,
    getWallets,
    deleteWallet,
    getWalletWithAccount,
    updateWallet
}

