// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: String,
    description: String,
    createdUser : String,
    createdDate : String,
    file : String,
    status : String
});

// Duplicate the ID field.
TodoSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
TodoSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Todo', TodoSchema)
