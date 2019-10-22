const mongoose = require('mongoose')
const Board = require('../models/board')

exports.main_get_page = (req, res, next) => {
    console.log('main page')
    var returnData = {
        board: [],
        picture: []
    }
    Board.find({ name: req.params.name })
        .select()
        .sort({'date': -1})
        .then(docs => {
            for(var index=0, doc; doc=docs[index]; index++) {
                if(doc.type === 'board' && returnData['board'].length < 9){
                    returnData['board'].push(doc)
                }
                else if(doc.type === 'picture' && returnData['picture'].length < 9){
                    returnData['picture'].push(doc)
                }
                if(returnData['board'].length >= 9 && returnData['picture'].length >= 9){
                    return res.status(200).json({
                        message: "Success get Main page",
                        result: returnData
                    })
                }
            }
            return res.status(200).json({
                message: "Success get Main page",
                result: returnData
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: "Main get page Error",
                error: error 
            })
        });
}

exports.main_get_image = (req, res, next) => {
    console.log('main page get image')
    Image.findOne({ _id: req.params.id})
        .select()
        .then(oneImage => {
            return res.status(200).json({
                oneImage
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "image file get Error",
                error: error 
            })
        });
}