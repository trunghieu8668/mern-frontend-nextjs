const express = require('express');
const router = express.Router();

const { create, create2, createOld, productById, read, remove, update, update2, update3, list, listRelated, listCategories, listBySearch, photo, listSearch, totalProducts, totalBySearch, getStatusValues, homeProductListByStatus} = require('../controler/product');
const { requireSignin, isAuth, isAdmin } = require('../controler/auth');
const { userById } = require('../controler/user');


router.get('/product/:productId', read);

router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove)
//router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, upload.array("photo", 6), update2)
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update3)
router.get('/products', list)
router.get('/products/related/:productId', listRelated)
router.get('/productgroupbyproduct', listCategories)
router.post('/products/by/search', listBySearch)
router.get('/product/photo/:productId', photo)
router.get('/products/search', listSearch)
router.get('/products/count', totalProducts)
router.post('/products/count/search', totalBySearch)
router.get('/product/status-values/:userId', requireSignin, isAuth, isAdmin, getStatusValues)
//Home PAGE
router.get('/products/by/homeproduct', homeProductListByStatus)
// PARAM
router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
