

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');
  favicon = require('serve-favicon');
var app = express();
  mongoose.Promise = global.Promise;
  var mongoDB = mongoose.connect(config.db, {
    useMongoClient: true
  });
  mongoDB
    .then(function (db) {
      console.log('mongodb has been connected');
    })
    .catch(function (err) {
      console.log('error while trying to connect with mongodb');
    });

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});


module.exports = require('./config/express')(app, config);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
