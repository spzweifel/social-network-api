const { User, Thought } = require("../models");

module.exports = {
  //gets all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //double check this section
  //gets one thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //create a thought
  createThought({ body }, res) {
    console.log(body);
    Thought.create(body)
        .then((thoughtData) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
            );
        })
        .then((userData) => {
            if (!userData) {
                res.status(404).json({ message: "no user found" });
                return;
            }
            res.json(userData);
        })
        .catch((err) => res.json(err));
  },
};
