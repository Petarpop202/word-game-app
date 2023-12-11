const express = require('express');
const router = express.Router();
const dictionaryService = require('../../services/dictionaryService');

router.post('/', async (req, res, next) => {
    const wordToCheck = req.body && req.body.word;

    const result = await dictionaryService.checkWordResult(wordToCheck);

    if (result !== 0) {
        res.status(200).json({
            message: `The word "${wordToCheck}" is a valid English word.`,
            totalPoints: result
        });
    } else {
        res.status(404).json({
            message: `The word "${wordToCheck}" is not found in the English dictionary.`,
            totalPoints: result,
            error: result.error
        });
    }
});

module.exports = router;