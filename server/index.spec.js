// const request = require('supertest');
// const app = require('./index.js');
const {Pool} = require('pg');
const axios = require('axios');

const pool = new Pool({
  user: 'danielchu',
  database: 'productAPI',
  host: 'localhost',
  password: '',
  port: 5432,
});
describe('SUPER NECESSARY JESTING', () => {
  beforeAll(() => {
    pool.connect();
  });

  // it('Setup Jest Testing', () => {
  //     expect(true).toEqual(true);
  // });

  it('Sends back a response for products endpoint', ()=> {
    return axios.get('http://127.0.0.1:3000/products')
    expect(response.statusCode).toBe(200);
  })

  it('Requests to base url sends an array of length 5', ()=> {
    return axios.get('http://127.0.0.1:3000/products')
      .then(response => {
        expect(response.data.length).toBe(5);
      })
  })

  it('Sends back a response for product info endpoint', ()=> {
    let options = {url: '/products/2', baseURL: 'http://127.0.0.1:3000', method: 'get'}
    return axios(options)
      .then(response=>{
        expect(response.data).toBeInstanceOf(Object);
      })
  })

  it('A request for product info sends back a response with all the correct properties', ()=> {
    let options = {url: '/products/2', baseURL: 'http://127.0.0.1:3000', method: 'get'}
    let expected = {
      "id": 2,
      "name": "Bright Future Sunglasses",
      "slogan": "You've got to wear shades",
      "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
      "default_price": "69",
      "category": "Accessories",
      "features": [
          {
              "feature": "Lenses",
              "value": "Ultrasheen"
          },
          {
              "feature": "UV Protection",
              "value": "null"
          },
          {
              "feature": "Frames",
              "value": "LightCompose"
          }
      ]
  }
    return axios(options)
      .then(response=>{
        expect(response.data).toEqual(expected);
      })
  })

  it('A request for styles should send back an object', ()=> {
    let options = {url: '/products/2/styles', baseURL: 'http://127.0.0.1:3000', method: 'get'}
    return axios(options)
      .then(response=>{
        expect(response.data).toBeInstanceOf(Object);
      })
  })

  it('A request for related products should send back an array ', ()=> {
    let options = {url: '/products/2/related', baseURL: 'http://127.0.0.1:3000', method: 'get'}
    return axios(options)
      .then(response=>{
        expect(response.data).toBeInstanceOf(Array);
      })
  })




  // afterAll(() => {
  //   pool.end();
  // });
});