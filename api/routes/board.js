const express = require('express');
const router = express.Router();
const multer = require('multer');

const Board = require('../models/board');
const BoardController = require('../controllers/board');

const check_session = require('../middleware/check_session');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        // make File name
        var now = new Date();
        var month = (now.getMonth()+1).toString();
        var dd = now.getDay().toString();
        var hh = now.getHours().toString();
        var mm = now.getMinutes().toString();
        var ss = now.getSeconds().toString();
        cb(null, now.getFullYear() + month + dd + hh + mm + ss + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// Get Post ( board / picture )
router.get('/:name', BoardController.board_get_list_page);

router.get('/:name/page/:page', BoardController.board_get_list_page);

router.get('/:name/:id', BoardController.board_get_post);

// create
router.post('/:name', check_session.checkWriter, upload.single('uploadImage'), BoardController.board_create_newBoard);

router.get('/:category', BoardController.board_get_list);

// try post delete
router.delete('/:id', BoardController.post_delete);

module.exports = router;