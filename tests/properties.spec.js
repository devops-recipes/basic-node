var app = require('../app');
var request = require('supertest');
var ip = require('ip');

describe('/properties route',
  function () {
    describe('GET /properties',
      function () {

        it('should include server ip and datetime by default',
          function (done) {
            request(app)
              .get('/properties')
              .expect('Content-Type', /json/)
              .expect(
                function (res) {
                  res.body.hostDatetime = res.body.hostDatetime.substring(0, 4);
                }
              )
              .expect(200, {
                  hostAddress: ip.address(),
                  hostDatetime: new Date().toISOString().substring(0, 4)
                },
                done);
          }
        );
      }
    );

    describe('POST /properties',
      function () {
        it('should ignore properties with empty keys or values',
          function (done) {
            request(app)
              .post('/properties')
              .send({
                key: 'iHaveNoValue',
                value: ''
              }).end(
              function (err) {
                if (err) throw err;
              }
            );

            request(app)
              .post('/properties')
              .send({
                  key: '',
                  value: 'iHaveNoKey'
                }
              ).end(
              function (err) {
                if (err) throw err;
              }
            );

            request(app)
              .get('/properties')
              .expect('Content-Type', /json/)
              .expect(
                function (res) {
                  delete res.body.hostDatetime;
                }
              )
              .expect(200, {
                hostAddress: ip.address()
              }, done);
          }
        );

        it('should add new or update existing properties',
          function (done) {
            request(app)
              .post('/properties')
              .send({
                  key: 'myKey',
                  value: 'myValue'
                }
              ).end(
              function (err) {
                if (err) throw err;
              }
            );

            request(app)
              .get('/properties')
              .expect('Content-Type', /json/)
              .expect(
                function (res) {
                  delete res.body.hostDatetime;
                }
              )
              .expect(200, {
                hostAddress: ip.address(),
                myKey: 'myValue'
              }, done);
          }
        );

        it('should respond with ok',
          function (done) {
            request(app)
              .post('/properties')
              .send({
                  key: 'oneMoreKey',
                  value: 'oneMoreValue'
                }
              ).expect(200, 'ok', done);
          }
        );
      }
    );
  }
);
