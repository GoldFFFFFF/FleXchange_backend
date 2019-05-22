const { host, port, database } = require('./db.json');

module.exports = {
  port: process.env.PORT || 3000,
  mongoURL: 'mongodb://gute:guterunde@203.195.164.28:27017/admin'
  //mongoURL: 'mongodb://127.0.0.1:27017/admin'
};
