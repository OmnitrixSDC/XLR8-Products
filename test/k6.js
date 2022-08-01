import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 10000,
      timeUnit: '1s',
      duration: '10s',
      preAllocatedVUs: 1,
      maxVUs: 1,
    }
  }
};

export default function () {
    const res = http.get('http://localhost:8120/products?page=200000&count=5');
    // const res = http.get('http://localhost:8120/products/1000000');
    // const res = http.get('http://localhost:8120/products/1000000/styles');
    // const res = http.get('http://localhost:8120/products/1000000/related');
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}