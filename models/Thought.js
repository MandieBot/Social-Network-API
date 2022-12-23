const { Schema, model } = require("mongoose");

// const Thought = mongoose.model(
//   "Thought",
//   mongoose.Schema({
const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true, match: "/^.{0,280}$/" },
  createdAt: {}, //needs the following: Date, Set default value to the current timestamp, Use a getter method to format the timestamp on query

  //user that created this thought
  username: { type: String, required: true },

  //these are replies
  reactions: {}, //array of nested documents created with the reactionSchema
});

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

thoughtSchema.virtual("reactionCount").get(function () {
  return `${reactions.length}`;
});

//Initialize the Thought model
const Thought = model("Thought", thoughtText);

module.exports = Thought;
