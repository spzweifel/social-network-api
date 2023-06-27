const { Schema, model } = require('mongoose');

const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_lenghth: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual("reactionCount")
    .get(function () {
        return this.reactions.length;
    });

const Thoughts = model('thought', thoughtSchema);

module.exports = Thoughts;

//should be finished