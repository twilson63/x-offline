var req = require('supertest');
var app = require('../');

describe("server", function() {
  it('GET / should return index.html', function(done) {
    req(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
  it('GET /db should return 401', function(done) {
    req(app)
      .get('/db')
      .expect(401, done);
  });
});