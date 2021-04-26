const { Router } = require('express');
const  router = Router();



const { getAccount, getAccounts, crateAccount, getBalance } = require('../controllers/account.controllers')

router.get('/balance/:address', getBalance);
router.get('/:id', getAccount);
router.get('/', getAccounts);
router.post("/", crateAccount);




module.exports = router;