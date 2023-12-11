const assert = require('assert');
const request = require('supertest');
const app = require('../app'); 

describe('Word Check API', () => {
  // Valid word
  it('should return success for a valid word', async () => {
    const response = await request(app)
      .post('/word-check')
      .send({ word: 'example' });

    assert.strictEqual(response.status, 200);

    assert.strictEqual(
      response.body.message,
      'The word "example" is a valid English word.'
    );

    assert.strictEqual(response.body.totalPoints, 6);
  });

  // Valid word and palindrome
  it('should return success for a valid word and palindrome word', async () => {
    const response = await request(app)
      .post('/word-check')
      .send({ word: 'ana' });

    assert.strictEqual(response.status, 200);

    assert.strictEqual(
      response.body.message,
      'The word "ana" is a valid English word.'
    );

    assert.strictEqual(response.body.totalPoints, 5);
  });

  //Valid word and almost palindrome
  it('should return success for a valid word and almost palindrome word', async () => {
    const response = await request(app)
      .post('/word-check')
      .send({ word: 'banana' });

    assert.strictEqual(response.status, 200);

    assert.strictEqual(
      response.body.message,
      'The word "banana" is a valid English word.'
    );

    assert.strictEqual(response.body.totalPoints, 5);
  });

  // Invalid word
  it('should return error for an invalid word', async () => {
    const response = await request(app)
      .post('/word-check')
      .send({ word: 'invalidword' });

    assert.strictEqual(response.status, 404);

    assert.strictEqual(
      response.body.message,
      'The word "invalidword" is not found in the English dictionary.'
    );

    assert.strictEqual(response.body.totalPoints, 0);
  });
});
