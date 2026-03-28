const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const authController = require('../controllers/auth.controller');
const logincontroller = require('../controllers/login.controller');

//REGISTER ROUTE
router.post('/register', authController.register);
//login route
router.post('/login', logincontroller.login);
// PROFILE ROUTE
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: "Profile accessed", user: req.user });
});

module.exports = router;