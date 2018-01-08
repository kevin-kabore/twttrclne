var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

const devURL = 'mongodb://localhost/warbler';
const url =
  process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : devURL;

mongoose.connect(url, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

module.exports.User = require('./user');
module.exports.Message = require('./message');
