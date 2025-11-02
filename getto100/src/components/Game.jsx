import { useState } from "react";
import "../App.css";

function Game({ initialNumber, isActive, handleMove, startButton }) {
  const [currentNumber, setCurrentNumber] = useState(initialNumber);
  const [steps, setSteps] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  function handleNumberChange(newNumber) {
    if (!isActive || isFinished || !startButton) return;
    setSteps(steps + 1);
    setCurrentNumber(newNumber);
    if (newNumber === 100) {
      setIsFinished(true);
      alert("Wow! you got to 100");
    }
    handleMove();
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
    </>
  );
}

export default Game;
