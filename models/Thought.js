const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        //TO DO: fill in the schema here
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const Thoughts = model('thought', thoughtSchema);

module.exports = Thoughts;