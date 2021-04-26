const { Router } = require('express');
const  router = Router();



const { getWallet, crateWallet, getWallets, deleteWallet } = require('../controllers/wallet.controllers')

router.get('/', getWallets);
router.get('/:id', getWallet);
router.post('/', crateWallet);
router.delete('/:id',deleteWallet);



module.exports = router;