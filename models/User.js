const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const Thoughts = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: STRING,
            required: true,
            trimmed: true,
        },
        email: {
            type: STRING,
            required: true,
            unique: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            }
        ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual("friendCount")
    .get(function () {
        return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;

//this should be done