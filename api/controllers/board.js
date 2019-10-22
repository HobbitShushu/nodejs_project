const mongoose = require('mongoose')
const Board = require('../models/board')

// Get one category post list
exports.board_get_list = (req, res, next) => {
    console.log('board_get_list')
    Board.find({ category : req.params.category })
        .select()
        .then(docs => {
            return res.status(200).json({
                message : "Get " + req.params.category + " Post List",
                length : docs.length,
                doc : docs.map((doc) => {
                    return {
                        post_id : doc._id,
                        poster : doc.name,
                        post_url : 'localhost:3000/board/' + doc._id,
                        upload_date : doc.date,
                    }
                })
            });
        })
        .catch(error => {
            res.status(500).json({
                message : "Fail to Get Post List",
                erorr : error
            });
        });
}
exports.board_get_list_page = (req, res) => {
    var skipPage = 0;

    if (req.params.page === undefined)
        skipPage = 0
    else
        skipPage = (int(req.params.page) - 1 ) * 10

    Board.find({type: "board", name: req.params.name})
        .select()
        .skip(skipPage)
        .limit(10)
        .then(result => {
            return res.status(200).json({
                result: result
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
}

exports.board_get_post  = (req, res, next) => {
    Board.find({ _id : req.params.id })
        .select()
        .then(result => {
            if(result.length < 1){
                return res.status(402).json({
                    result : result
                });
            }
            return res.status(200).json({
                result : result
            });
        })
        .catch(error => {
            res.status(500).json({
                error : error
            });
        });
}

// Create Post
exports.board_create_newBoard = (req, res, next) => {    
    console.log('create new board')
    // check session to create board
    console.log(req.body.title)
    console.log(req.file)
    const new_board = new Board({
        type: 'board',
        name : req.params.name,
        title : req.body.title,
        imageURL : req.file.filename,
        context : req.body.context,
        tag : Array(req.body.tag),
        date : Date.now()
    });
    new_board
        .save()
        .then(data => {
            return res.status(201).json({
                message : "New Post was updated!",
                result : data
            });
        })
        .catch(error => {
            console.log(error);
            return res,status(500).json({
                message : "New Post wasn't updated",
                error : error
            });
        });
}

exports.post_delete = (req, res, next) => {
    // success or there isn't the data, the result is the same 
    Board.remove({ _id: req.params.id })
        .then(result => {
            // status 204 its don't need to return, use end()
            return res.status(200).end()
        })
        .catch(error => {
            res.status(500).json({error:error})
        })
}