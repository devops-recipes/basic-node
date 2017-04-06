var app = require('../app');
var request = require('supertest');

describe('/users route',
  function () {
    describe('GET /users',
      function () {
        it('should respond with content',
          function (done) {
            request(app)
              .get('/users')
              .expect('Content-Type', /text\/html/)
              .expect(200, done);
          }
        );
      }
    );
  }
);
