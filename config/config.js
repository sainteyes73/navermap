var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'geolocation'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost:27017/geolocation'
  },

  test: {
    root: rootPath,
    app: {
      name: 'geolocation'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/geolocation-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'geolocation'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/geolocation-production'
  }
};

module.exports = config[env];
