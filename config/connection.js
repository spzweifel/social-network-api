const { connect, connection } = require('mongoose');
const mongoose = require("mongoose");

// figure out what you database will be and replace studentsDB
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = connection;
