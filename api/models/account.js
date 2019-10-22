const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    // _id is created automatically
    //_id : mongoose.Types.ObjectId,
    username : { type : String, required : true, unique : true },
    name : { type : String, required : true, unique : true }, 
    password : { type : String, required : true },
    registDate : Date,
});

module.exports = mongoose.model('Account', accountSchema);