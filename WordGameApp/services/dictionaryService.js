const axios = require('axios');

const englishDictionaryApiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

async function checkWordResult(wordToCheck) {
    const dictionaryResult = await checkWordInDictionary(wordToCheck);
    let totalPoints = 0;

    if (dictionaryResult.isValid) {
        totalPoints += getWordPoints(wordToCheck)

        if (isPalindrome(wordToCheck)) {
            totalPoints += 3;
        }
        else if(isAlmostPalindrome(wordToCheck)){
            totalPoints += 2;
        }
    }

    return totalPoints;
}

async function checkWordInDictionary(wordToCheck) {
    try {
        const response = await axios.get(`${englishDictionaryApiUrl}${wordToCheck}`);
        return {
            isValid: true,
        };
    } catch (error) {
        return {
            isValid: false,
            error: error.message
        };
    }
}

function getWordPoints(word) {
    const uniqueLetters = new Set(word);
    const points = uniqueLetters.size;

    return points;
}

function isPalindrome(word) {
    const cleanedWord = word.replace(/\s/g, '').toLowerCase();
    
    return cleanedWord === cleanedWord.split('').reverse().join('');
}

function isAlmostPalindrome(word) {
    const cleanedWord = word.replace(/\s/g, '').toLowerCase();

    for (let i = 0; i < cleanedWord.length; i++) {
        const modifiedWord = cleanedWord.slice(0, i) + cleanedWord.slice(i + 1);;
        if (isPalindrome(modifiedWord)) {
            return true;
        }
    }

    return false;
}

module.exports = {
    checkWordResult,
    checkWordInDictionary,
    isPalindrome,
    isAlmostPalindrome
};