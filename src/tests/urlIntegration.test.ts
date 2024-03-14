import request from 'supertest';
import app from '../app';

describe('Url Integration Tests', () => {
  test('should shorten URL via API', async () => {
    const response = await request(app)
      .post('/shorten-url')
      .send({ originalUrl: 'https://example.com' });

    expect(response.status).toBe(200);
    expect(response.body.shortUrl).toBeDefined();
  });

  // Add more tests for other API routes...
});
