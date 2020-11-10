const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controler/auth');
const { userById, read, update, purchaseHistory } = require('../controler/user');


router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res)=>{
    res.json({
        user: req.profile
    })
})
router.get('/user/:userId', requireSignin, isAuth, read)
router.put('/user/:userId', requireSignin, isAuth, update)
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory)
//param
router.param('userId', userById)

module.exports = router;
