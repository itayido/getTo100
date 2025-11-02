import { useState } from "react";
import "../App.css";
import Game from "./Game";
function GameBoards({ players, startButton }) {
  const [currentTurn, setcurrentTurn] = useState(0);

  function handleMove() {
    setcurrentTurn((prev) => (prev + 1) % players.length);
  }
  return (
    <>
      {players.map((gamer, index) => {
        return (
          <div>
            Gamer: {gamer.userName}
            <br />
            <Game
              key={index}
              initialNumber={gamer.initialNumber}
              handleMove={handleMove}
              isActive={currentTurn === index}
              startButton={startButton}
            />
            <br />
            Scores: {gamer.scores}
          </div>
        );
      })}
    </>
  );
}

export default GameBoards;
