import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  discardResponseBodies: true,
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: '300',
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 20,
      maxVUs: 200
    }
  }
};

export default function () {
    // const res = http.get('http://localhost:8120/products?page=200000&count=5');
    // const res = http.get('http://localhost:8120/products/1000000');
    // const res = http.get('http://localhost:8120/products/1000000/styles');
    const res = http.get('http://localhost:8120/products/1000000/related');
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
};