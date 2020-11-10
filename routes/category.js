const express = require('express');
const router = express.Router();

const { create, categoryById, read, update, remove, list} = require('../controler/category');
const { requireSignin, isAuth, isAdmin } = require('../controler/auth');
const { userById } = require('../controler/user');

router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);
router.get('/categories', list);
// param
router.param('categoryId', categoryById);
router.param('userId', userById)

module.exports = router;
