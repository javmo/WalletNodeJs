const { Router } = require('express');
const  router = Router();



const { getAccount, getAccounts, crateAccount, getBalance, importAccount } = require('../controllers/account.controllers')

router.get('/balance/:address', getBalance);

router.get('/:id', getAccount);
/**
 * @openapi
 * /api/accounts:
 *   get:
 *     tags:
 *       - Account
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get('/', getAccounts);
router.post("/", crateAccount);
router.post("/import", importAccount);




module.exports = router;