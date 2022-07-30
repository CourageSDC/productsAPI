const request = require('supertest');
const app = require('./index.js');

describe('SUPER NECESSARY JESTING', () => {
  it('Setup Jest Testing', () => {
      expect(true).toEqual(true);
  });

  it('Send correct code for the GET Method', ()=> {
    return request(app)
      .get("/")
      .expect(200);
  })


});