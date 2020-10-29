const express = require('express');
const router = express.Router();

const { create, userGroupById, read, update, remove, list} = require('../controler/usergroup');
const { requireSignin, isAuth, isAdmin } = require('../controler/auth');
const { userById } = require('../controler/user');

router.get('/usergroup/:usergroupId', read);
router.post('/usergroup/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put('/usergroup/:usergroupId/:userId', requireSignin, isAuth, isAdmin, update);
router.delete('/usergroup/:usergroupId/:userId', requireSignin, isAuth, isAdmin, remove);
router.get('/usergrouplist', list);
// param
router.param('userGroupId', userGroupById);
router.param('userId', userById)

module.exports = router;
