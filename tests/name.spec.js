var app = require('../app');
var request = require('supertest');

describe('/name route',
  function () {
    describe('GET /name',
      function () {
        it('should respond with full name',
          function (done) {
            request(app)
              .get('/name')
              .expect('Content-Type', /json/)
              .expect(200, {
                firstName: 'John',
                lastName: 'Smith'
              }, done);
          }
        );
      }
    );

    describe('PUT /name',
      function () {
        it('should update first and last name',
          function (done) {
            request(app)
              .put('/name')
              .type('json')
              .send({
                  firstName: 'Jane',
                  lastName: 'Doe'
                }
              ).end(
              function (err) {
                if (err) throw err;
              }
            );

            request(app)
              .get('/name')
              .expect('Content-Type', /json/)
              .expect(200, {
                firstName: 'Jane',
                lastName: 'Doe'
              }, done);
          }
        );

        it('should ignore empty names',
          function (done) {
            request(app)
              .put('/name')
              .send({
                  firstName: 'Jane',
                  lastName: 'Doe'
                }
              ).end(
              function (err) {
                if (err) throw err;
              }
            );

            request(app)
              .put('/name')
              .send({
                  firstName: '',
                  lastName: 'Smith'
                }
              ).end(
              function (err) {
                if (err) throw err;
              }
            );

            request(app)
              .put('/name')
              .send({
                firstName: 'Anna',
                lastName: ''
              }).end(
              function (err) {
                if (err) throw err;
              }
            );

            request(app)
              .get('/name')
              .expect('Content-Type', /json/)
              .expect(200, {
                firstName: 'Anna',
                lastName: 'Smith'
              }, done);
          }
        );

        it('should respond with the new full name',
          function (done) {
            request(app)
              .put('/name')
              .send({
                  firstName: 'John',
                  lastName: 'Doe'
                }
              )
              .expect(200, {
                firstName: 'John',
                lastName: 'Doe'
              }, done);
          }
        );
      }
    );
  }
);
