const express = require('express');
const router = express.Router();

const walletController = require('../controllers/wallet.controller');
const authMiddleware = require('../middleware/auth.middleware');


// Protected route
router.get('/', authMiddleware, walletController.getWallet);
router.post('/add-money', authMiddleware, walletController.addMoney);
router.post('/send-money', authMiddleware, walletController.sendMoney);
router.get('/transactions', authMiddleware, walletController.getTransactions);

module.exports = router;