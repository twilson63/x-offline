var express = require('express');
var persona = require('x-persona');
var forward = require('x-forward');
var app = express();
var couch = 'http://localhost:5984';

app.configure(function() {
  app.use(express.favicon());
  app.use(express.logger());
  app.use('/_api/session', persona('localhost', function(email, done) {
    // admin party
    process.nextTick(function() {
      done(null, { email: email });
    });
  }));
  // // mount couchdb on /db endpoint
  app.use('/db', function(req, res, next) {
    if (!req.isAuthenticated()) { return res.send(401); }
    next();
  });
  app.use('/db', forward(couch));
  app.use("/", express.static(__dirname + '/public'));

});


app.get("/*", function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

if (!module.parent) {
  app.listen(3000);
}

module.exports = app;