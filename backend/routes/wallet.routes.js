const { Router } = require('express');
const  router = Router();



const { getWallet, crateWallet, getWallets } = require('../controllers/wallet.controllers')

router.get('/', getWallets);
router.get('/:id', getWallet);
router.post('/', crateWallet);



module.exports = router;