const express = require('express');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require('../controler/auth');
const { userById, addOrderToUserHistory } = require('../controler/user');
const { create, listOrders, getStatusValues, orderById, updateOrderStatus } = require('../controler/order')
const { decreaseQuantity } = require('../controler/product')

router.post('/order/create/:userId', requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, create)
router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders)
router.get('/order/status-values/:userId', requireSignin, isAuth, isAdmin, getStatusValues)
router.put('/order/:orderId/status/:userId', requireSignin, isAuth, isAdmin, updateOrderStatus)
// export req.body.user
router.param('userId', userById)
router.param('orderId', orderById)
module.exports = router
