const { Schema, model } = require("mongoose");

//Schema to create User model

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ], //array of _id values referencing the Thought model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ], //array of _id values referencing the User model (self-reference)
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
    return `${this.friends.length}`;
  });

//Initialize the User model
const User = model("User", userSchema);

module.exports = User;
