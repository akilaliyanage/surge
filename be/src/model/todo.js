// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: String,
    description: String,
    createdUser : String,
    createdDate : Date,
    file : String,
    status : String
});

module.exports = mongoose.model('Todo', TodoSchema)
