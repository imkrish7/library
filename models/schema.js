const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
            name:String,
            comment:Number,
            comments:[]
})

module.exports = mongoose.model("Book",Book);