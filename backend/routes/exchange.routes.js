const { Router } = require('express');
const  router = Router();



const { buyEth, sellEth } = require('../controllers/exchange.controllers')

router.get('/buyEth/:id', buyEth);
router.get('/sellEth/:id', sellEth);





module.exports = router;