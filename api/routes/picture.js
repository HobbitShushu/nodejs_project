const express = require('express');
const router = express.Router();
const multer = require('multer');

const PictureController = require('../controllers/picture');

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

// /board/:name

// Get Post ( board / picture )
router.get('/:name', PictureController.picture_get_list_page);

router.get('/:name/page/:page', PictureController.picture_get_list_page);

router.get('/:name/:id', PictureController.picture_get_post);

// create
router.post('/:name', check_session.checkWriter, upload.single('uploadImage'), PictureController.picture_create_newBoard);


router.get('/:category', PictureController.picture_get_list);

// try post delete
router.delete('/:id', PictureController.picture_post_delete);

// patch
// router.patch('/', AccountController.account_update_information);
//router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);

module.exports = router;