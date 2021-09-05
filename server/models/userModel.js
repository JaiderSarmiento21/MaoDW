const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number ,
    first_name: String,
    last_name:String,
    donations:Number ,
    total:mongoose.Schema.Types.Decimal128,
    image:String,
    description:String
});

module.exports = mongoose.model('user', userSchema);