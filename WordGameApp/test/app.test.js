const assert = require('assert');
const request = require('supertest');
const app = require('../app'); 

describe('Word Check API', () => {
  // Valid word 1 pts
  it('should return success for a valid word, expected points 1', async () => {
    const response = await request(app)
      .post('/word-check')
      .send({ word: 'example' });

    assert.strictEqual(response.status, 200);

    assert.strictEqual(
      response.body.message,
      'The word "example" is a valid English word.'
    );

    assert.strictEqual(response.body.totalPoints, 1);
  });

  // Valid word and palindrome 4 pts
  it('should return success for a valid word and palindrome word, expected points 4', async () => {
    const response = await request(app)
      .post('/word-check')
      .send({ word: 'ana' });

    assert.strictEqual(response.status, 200);

    assert.strictEqual(
      response.body.message,
      'The word "ana" is a valid English word.'
    );

    assert.strictEqual(response.body.totalPoints, 4);
  });

  //Valid word and almost palindrome 3 pts
  it('should return success for a valid word and almost palindrome word, expected points 3', async () => {
    const response = await request(app)
      .post('/word-check')
      .send({ word: 'banana' });

    assert.strictEqual(response.status, 200);

    assert.strictEqual(
      response.body.message,
      'The word "banana" is a valid English word.'
    );

    assert.strictEqual(response.body.totalPoints, 3);
  });

  // Invalid word 0 pts
  it('should return error for an invalid word, expected points 0', async () => {
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
