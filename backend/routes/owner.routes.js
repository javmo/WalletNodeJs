const { Router } = require('express');
const  router = Router();



const { getOwner, crateOwner, getOwners, crateOwnerWithAccount, getOwnerByName } = require('../controllers/owner.controllers')

router.get('/', getOwners);
router.get('/search', getOwnerByName);
router.get('/:id', getOwner);
router.post('/', crateOwner);
router.post('/withAccount',crateOwnerWithAccount);




module.exports = router;