import { useState } from "react";
import "../App.css";
import Game from "./Game";
function GameBoards({ players, startButton, setPlayers }) {
  const [currentTurn, setCurrentTurn] = useState(0);

  function resetGame(index) {
    setPlayers((prev) => {
      const updatedPlayers = [...prev];
      updatedPlayers[index] = {
        userName: updatedPlayers.userName,
        initialNumber: Math.floor(Math.random() * 100),
        resetCounter: updatedPlayers[index].resetCounter + 1,
        scores: [...updatedPlayers[index].scores],
      };
      localStorage.setItem("players", JSON.stringify(updatedPlayers));
      return updatedPlayers;
    });
    setCurrentTurn((prev) => (prev + 1) % players.length);
  }

  function exitGame(index) {
    setPlayers((prev) => {
      const newPlayers = prev.filter((player, i) => i !== index);
      return newPlayers;
    });
    setCurrentTurn((prev) => {
      if (prev > index) return prev - 1;
      if (prev === index) return prev % (players.length - 1 || 1);
      return prev;
    });
  }

  return (
    <>
      {players.map((gamer, index) => {
        return (
          <div key={gamer.userName}>
            Gamer: {gamer.userName}
            <br />
            <Game
              key={`${gamer.userName}-${gamer.resetCounter}`}
              id={index}
              userName={gamer.userName}
              initialNumber={gamer.initialNumber}
              isActive={currentTurn === index}
              startButton={startButton}
              resetGame={resetGame}
              exitGame={exitGame}
              currentTurn={currentTurn}
              setCurrentTurn={setCurrentTurn}
              players={players}
            />
            <br />
          </div>
        );
      })}
    </>
  );
}

export default GameBoards;
