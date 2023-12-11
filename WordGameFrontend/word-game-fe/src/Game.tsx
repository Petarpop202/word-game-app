import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiAgent from './api/agent';
import './Game.css';

function Game() {
  const [timer, setTimer] = useState(30);
  const [points, setPoints] = useState(0);
  const [wordInput, setWordInput] = useState('');
  const [submittedWords, setSubmittedWords] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (gameStarted && timer > 0 && !gameOver) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      clearInterval(interval);
      setGameOver(true);
    }

    return () => clearInterval(interval);
  }, [timer, gameStarted, gameOver]);

  const handleWordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWordInput(e.target.value);
  };

  const handleSubmitWord = async () => {
    if (wordInput.trim() !== '' && !submittedWords.includes(wordInput)) {
      try {
        const response = await apiAgent.post('/word-check', {
          word: wordInput,
        });

        if (response.data.totalPoints !== 1)
          toast.success('Success word !');

        setPoints((prevPoints) => prevPoints + response.data.totalPoints);
        setSubmittedWords((prevWords) => [...prevWords, wordInput]);
        setWordInput('');
      } catch (error) {
        setWordInput('');
        toast.error('Invalid word !');
      }
    } else {
      setWordInput('');
      toast.info('Word already used !');
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleRestartGame = () => {
    setTimer(30);
    setPoints(0);
    setWordInput('');
    setSubmittedWords([]);
    setGameOver(false);
    setGameStarted(false);
  };

  return (
    <div className="Game">
      <h1>Word game!</h1>
      {!gameStarted && !gameOver && (
        <button onClick={handleStartGame}>Start Game</button>
      )}
      {gameStarted && !gameOver && (
        <>
          <div className="Timer">Timer: {timer}s</div>
          <div className="Points">Points: {points}</div>
          <input
            type="text"
            value={wordInput}
            onChange={handleWordInputChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmitWord();
              }
            }}
            placeholder="Enter a word"
            disabled={gameOver}
          />
          <button onClick={handleSubmitWord} disabled={gameOver}>
            Submit
          </button>
        </>
      )}
      {gameOver && (
        <>
          <div>Game Over!</div>
          <div>Your score: {points}</div>
          <button onClick={handleRestartGame}>Start Again</button>
        </>
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Game;
