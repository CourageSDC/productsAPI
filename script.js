import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: '10000',
      timeUnit: '1s',
      //note: 1000 iterations per second
      duration: '60s',
      preAllocatedVUs: 20,
      maxVUs: 1000
    },
  },


  // vus: 10, //simulate how many virtual users
  // duration: "60s", //how long you want it to run
  // iterations: 1000
};
//Below randomize the endpoints
export default function () {
  let productID = Math.floor(Math.random() * 100000  + 900000) + 1

  // http.get(`http://localhost:3000/products`);
  // http.get(`http://localhost:3000/products/${productID}`);
  http.get(`http://localhost:3001/products/${productID}/styles`);
  // http.get(`http://localhost:3000/products/${productID}/related`);

}