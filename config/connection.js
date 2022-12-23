const { connect, connection } = require("mongoose");

connect(process.env.MONGODB_URI || "mongodb://localhost/socialNetworkApi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
