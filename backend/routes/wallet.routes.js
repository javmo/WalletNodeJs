const { Router } = require('express');
const  router = Router();



const { getWallet, crateWallet, getWallets, deleteWallet, getWalletWithAccount, updateWallet } = require('../controllers/wallet.controllers')

router.get('/', getWallets);
router.get('/:id', getWallet);
router.post('/', crateWallet);
router.delete('/:id',deleteWallet);
router.get('/getWithBalance/:id', getWalletWithAccount);
router.put('/:id', updateWallet);



module.exports = router;