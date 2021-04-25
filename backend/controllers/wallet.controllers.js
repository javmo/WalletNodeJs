const Wallet = require('../models/Wallet');
const Account = require('../models/Account');
const web3Service = require("../service/Web3Service");



const getWallet = async (req , res) => {
    // busca en los valores de task en el json y los trae
    console.log("entra a crear wallet");
    const wallet = await Wallet.findById(req.id)

    res.json(wallet);
};

const getWallets = async (req , res) => {

    const wallets = await Wallet.find();

    res.json(wallets);
};

const crateWallet = async (req, res) => {
    const newWallet = new Wallet({name: req.body.name});

    const wallet = await newWallet.save();

    const  account = web3Service.createAccount();

    await new Account({
        wallet: wallet.id,
        address: account.address,
        privateKey: account.privateKey
    }).save();

    res.json(wallet);
}


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
    getWallets
}