const { Schema, model } = require("mongoose");

//Schema to create User model

//const User = mongoose.model("User", mongoose.Schema({}))
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    thoughts: {}, //array of _id values referencing the Thought model
    friends: {}, //array of _id values referencing the User model (self-reference)
  },
  {
    toJSON: {
      virtuals: true,
    },
    // id: false,
  }
);

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

userSchema
  .virtual("friendCount")
  //Getter
  .get(function () {
    return `${friends.length}`;
    //Do I need a Setter?
  });

//Initialize the User model
const User = model("user", userSchema);

module.exports = User;
