var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
const devURL = 'mongodb://localhost/warbler';
const prodURL =
  'mongodb://kevinkabore:password@ds245347.mlab.com:45347/warbler-prod';
mongoose.connect(process.env.NODE_ENV === 'production' ? prodURL : devURL, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

module.exports.User = require('./user');
module.exports.Message = require('./message');
