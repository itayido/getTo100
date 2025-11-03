import { useState } from "react";
import "../App.css";

function Game({
  initialNumber,
  isActive,
  setCurrentTurn,
  startButton,
  resetGame,
  id,
  exitGame,
  players,
  userName,
}) {
  const [currentNumber, setCurrentNumber] = useState(initialNumber);
  const [steps, setSteps] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  function handleNumberChange(newNumber) {
    if (!isActive || isFinished || !startButton) return;
    setSteps(steps + 1);
    setCurrentNumber(newNumber);
    if (newNumber === 10) {
      setIsFinished(true);
      alert("Wow! you got to 100");
      const savedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
      const newSavedPlayers = savedPlayers.map((player) => {
        if (player.userName === userName) {
          return { ...player, scores: [...player.scores, steps + 1] };
        }
        return player;
      });
      localStorage.setItem("players", JSON.stringify(newSavedPlayers));
    }

    setCurrentTurn((prev) => (prev + 1) % players.length);
  }

  return (
    <>
      <div>Steps: {steps}</div>
      <div>Number:{currentNumber}</div>
      <div>
        {isActive && startButton && !isFinished ? "enabled" : "disabled"}
      </div>
      <button
        disabled={!isActive || !startButton || isFinished}
        onClick={() => handleNumberChange(currentNumber + 1)}
      >
        +1
      </button>
      <button
        disabled={!isActive || !startButton || isFinished}
        onClick={() => handleNumberChange(currentNumber - 1)}
      >
        -1
      </button>
      <button
        disabled={!isActive || !startButton || isFinished}
        onClick={() => handleNumberChange(currentNumber * 2)}
      >
        *2
      </button>
      <button
        disabled={!isActive || !startButton || isFinished}
        onClick={() => handleNumberChange(Math.floor(currentNumber / 2))}
      >
        /2
      </button>
      <h2>
        Scores:
        {players.find((player) => player.userName === userName).scores}
      </h2>

      {isFinished && (
        <div>
          <button
            disabled={!isActive}
            onClick={() => {
              resetGame(id);
            }}
          >
            restart
          </button>
          <button
            disabled={!isActive}
            onClick={() => {
              exitGame(id);
            }}
          >
            exit
          </button>
        </div>
      )}
    </>
  );
}

export default Game;
