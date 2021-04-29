const { Router } = require('express');
const  router = Router();



const { getOwner, crateOwner, getOwners, crateOwnerWithAccount, getOwnerByName, getOwnerWithAccount, loadOwnerAccount } = require('../controllers/owner.controllers')

router.get('/', getOwners);
router.get('/search', getOwnerByName);
router.get('/:id', getOwner);
router.post('/', crateOwner);
router.post('/withAccount', crateOwnerWithAccount);
router.get('/getWithAccount/:id', getOwnerWithAccount);
router.get('/load/:id', loadOwnerAccount);


module.exports = router;