const { Router } = require('express');
const  router = Router();



const { buyEth } = require('../controllers/exchange.controllers')

router.get('/buyEth', buyEth);





module.exports = router;