const router = require("express").Router();

const { getUsers, getOneUser, createUser, updateUser } = require("../../controllers/usersController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;
