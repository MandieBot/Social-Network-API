const router = require("express").Router();

const { getThoughts, getOneThought, createThought } = require("../../controllers/usersController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getOneThought);
// .put().delete();

module.exports = router;
