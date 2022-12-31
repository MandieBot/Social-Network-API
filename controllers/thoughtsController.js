const { User, Reaction, Thought } = require("../models");

module.exports = {
  //GET all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //GET a single thought by its _id
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) => (!thought ? res.status(404).json({ message: "No thought associated with that ID" }) : res.json(thought)))
      .catch((err) => res.status(500).json(err));
  },
  //POST a new thought and push the created thought's _id to the associated user's thoughts array field
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: thought._id } }).then((user) => {
          res.json(thought);
        });
      })
      .catch((err) => res.status(500).json(err));
  },
  //update a thought by its ID
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { new: true })
      .then((user) => (!user ? res.status(404).json({ message: "No thought found with that ID" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },
  //delete a thought by its ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No thought found with that ID" })
          : User.findOneAndUpdate({ username: user.username }, { $pull: { thoughts: user._id } })
      )
      .then(() => res.json({ message: "Thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  //create a reaction stored in a single thought's array field
  addReaction(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } })
      .then((user) => {
        res.status(200).json(user);
      })

      .catch((err) => res.status(500).json(err));
  },
  //remove a reaction by the reaction's reactionId value
  removeReaction(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } })
      .then((user) => {
        res.status(200).json(user);
      })

      .catch((err) => res.status(500).json(err));
  },
};
