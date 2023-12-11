const assert = require('assert');
const {
  checkWordResult,
  checkWordInDictionary,
  isPalindrome,
  isAlmostPalindrome
} = require('../services/dictionaryService');

describe('Word Game Functions', () => {
  it('should check if a word is a palindrome', () => {
    assert.strictEqual(isPalindrome('radar'), true);
    assert.strictEqual(isPalindrome('example'), false);
  });

  it('should check if a word is almost a palindrome', () => {
    assert.strictEqual(isAlmostPalindrome('banana'), true);
    assert.strictEqual(isAlmostPalindrome('world'), false);
  });

  it('should check if a word is in the dictionary', async () => {
    const resultExample = await checkWordInDictionary('example');
    const resultInvalidWord = await checkWordInDictionary('invalidWord');

    assert.strictEqual(resultExample.isValid, true);
    assert.strictEqual(resultInvalidWord.isValid, false);
  });

  it('should calculate total points for a word', async () => {
    const totalPointsRadar = await checkWordResult('radar');
    const totalPointsHam = await checkWordResult('ham');
    const totalPointInvalidWord = await checkWordResult('invalidWord');
    const totalPointBanana = await checkWordResult('banana');

    assert.strictEqual(totalPointsRadar, 6); 
    assert.strictEqual(totalPointsHam, 3); 
    assert.strictEqual(totalPointInvalidWord, 0); 
    assert.strictEqual(totalPointBanana, 5); 
  });

});
