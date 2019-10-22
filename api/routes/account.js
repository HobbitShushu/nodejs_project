const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Account = require('../models/account');
const AccountController = require('../controllers/account')

// login page
router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: "login page"
    });
});

// try login
router.post('/', AccountController.account_try_login);

// try logout
router.get('/logout', AccountController.account_logout);

// try regist account
router.post('/regist', AccountController.account_try_regist);

// try account delete
router.delete('/', AccountController.account_delete);

// patch
router.patch('/', AccountController.account_update_information);

module.exports = router;