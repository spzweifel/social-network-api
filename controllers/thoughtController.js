const { User, Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
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
  //possible issue here. Can't find any users
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body)
      const userData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );

      if (!userData) {
        res.status(404).json({ message: "no user found" });
        return;
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, New: true }
      );

      if (!thought) {
        res.status(404).json({ message: "Thought not found" })
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await  Thought.findOneAndDelete(req.params.thoughtId);

      if (!thought) {
        res.status(404).json({ message: "Thought not found" })
        return;
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ message: "Thought deleted, user not found" })
        return;
      }

      res.json({ message: "Thought deleted"})
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought found" })
        return;
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } }
      );

      if (!thought) {
        res.status(404).json({ message: "no thought found" })
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err)
    }
  },
};
