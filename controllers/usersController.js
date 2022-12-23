const { User, Reaction, Thought } = require("../models");

module.exports = {
  //GET all users
  getUsers(req, res) {
    User.findAll()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //GET single user by _id and populated thought and friend data
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) => (!user ? res.status(404).json({ message: "No user found with that ID" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },
  //POST a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //PUT to update a user by its _id
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId })
      .then((user) => (!user ? res.status(404).json({ message: "No user found with that ID" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },

  //DELETE to remove a user by its _id (bonus: remove a user's associated thoughts when deleted)
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => (!user ? res.status(404).json({ message: "No user found with that ID" }) : Thought.deleteMany({ _id: { $in: user.thoughts } })))
      .then(() => res.json({ message: "User and associated thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
};
