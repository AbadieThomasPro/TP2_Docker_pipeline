const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('./server');

test('GET /api/health returns ok status', async () => {
  const res = await request(app).get('/api/health');
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.status, 'ok');
});

test('GET /api/message returns the welcome message', async () => {
  const res = await request(app).get('/api/message');
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.message, 'Hello from the backend!');
});
