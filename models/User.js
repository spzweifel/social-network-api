const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const userSchema = new Schema(
    {
        //TO DO: fill in the schema
    }
);

const User = model('user', userSchema);

module.exports = User;