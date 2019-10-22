const mongoose = require('mongoose')
const Account = require('../models/account')

exports.account_try_login = (req, res, next) => {
    var sess = req.session;

    Account.findOne({ username : req.body.username, password : req.body.password })
        .select('username name registDate')
        .exec()
        .then(result => {
            if(result.length < 1){
                return res.status(401).json({
                    message : "Login Fail",
                });
            }
            
            sess.username = result['username']
            sess.name = result['name']

            return res.status(200).json({
                message : "Login success",
                result : result,
            })
        })
        .catch(error => {
            res.status(500).json({
                message : "Login error",
                error : error
            });
        });
}

exports.account_try_regist = (req, res, next) => {
    const account = new Account({
        username : req.body.username,
        name : req.body.name,
        password : req.body.password,
        registDate : Date.now()
    });
        
    Account.findOne({ username : req.body.username })
        .exec()
        .then(result => {
            if (result.length > 0) {
                return res.status(401).json({
                    message : "The username is already exist!",
                    result : result
                });
            }
            account
                .save()
                .then(data => {
                    res.status(200).json({
                        message : "Regist success",
                        result : data
                    });
                })
                .catch(error => {
                    console.log(error);
                    res.status(402).json({
                        message : "Error",
                        error : error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message : "find one error",
                error : error
            });
        });
}

exports.account_logout = (req, res, next) => {
    var sess = req.session;
    console.log(sess)

    if( sess.username ){
        req.session.destroy( err => {
            if(err){
                return res.status(500).json({
                    message : "Logout Fail",
                    error : err
                });
            }
            else{
                return res.status(200).json({
                    message : "Logout Success"
                });
            }
        })
    }

    else{
        res.status(402).json({
            message: "Auth Fail"
        });
    }
}

exports.account_delete = (req, res, next) => {
    Account.findOne({username : req.body.username, password : req.body.password })
        .exec()    
        .then(result => {
            if( result === null ){
                res.status(401).json({
                    message : "No Data"
                });
            }
            else{
                Account.remove({username : req.body.username, password : req.body.password })
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            message : "Account deleted",
                            result : result
                        });
                    })
                    .catch(error => {
                        res.status(500).json({
                            message : "Delete error",
                            error : error
                        });
                    });
            }
        })
        .catch(error => {
            res.status(500).json({
                message : "Delete Error",
                error : error
            });
        });
}

exports.account_update_information = (req, res, next) => {

}