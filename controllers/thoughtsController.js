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
  //POST a new thought - don't forget to push the created thought's _id to the associated user's thoughts array field
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
};
