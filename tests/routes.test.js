const request = require('supertest');
const app = require('../dist/app').default;

describe('The home route', () => {
  it('should respond to GET with status 200', () => {
    request(app)
      .get('/')
      .set('Accept', 'text/html')
      .expect(200);
  });

  it('should respond to GET with html', () => {
    request(app)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', 'text/html');
  });
});
