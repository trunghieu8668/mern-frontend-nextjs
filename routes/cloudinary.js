const express = require('express')
const router = express.Router()

// middlewares
const { upload, remove } = require('../controler/cloudinary')
const { requireSignin, isAuth, isAdmin } = require('../controler/auth')
const { userById } = require('../controler/user');
//
router.post("/uploadimages/:userId", requireSignin, isAuth, isAdmin, upload);
router.post("/removeimages/:userId", requireSignin, isAuth, isAdmin, remove);

router.param('userId', userById);

module.exports = router;
