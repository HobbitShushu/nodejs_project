const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    // picture or board
    type : {type: String, required: true},
    category : { type : String, default : "", },
    name : { type : String, required : true, },
    
    title : { type : String, required : true, },
    imageURL : { type : String, },
    context : { type : String, },

    tag : { type : Array },
    date : Date,
});

module.exports = mongoose.model('Board', boardSchema);