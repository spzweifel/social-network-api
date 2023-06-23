const { connect, connection } = require('mongoose');

// figure out what you database will be and replace studentsDB
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';

connect(connectionString);

module.exports = connection;
