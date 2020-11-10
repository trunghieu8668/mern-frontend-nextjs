const express = require('express');
const router = express.Router();
const { requireSignin, isAuth } = require('../controler/auth');
const { userById } = require('../controler/user');
const { generateToken, processPayment } = require('../controler/braintree')

router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken)
router.post('/braintree/payment/:userId', requireSignin, isAuth, processPayment)

router.param('userId', userById)
module.exports = router
