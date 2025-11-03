import { useState } from "react";
import "../App.css";
import Game from "./Game";
function GameBoards({ players, startButton, setPlayers }) {
  const [currentTurn, setCurrentTurn] = useState(0);

  function resetGame(index) {
    const savedPlayers = JSON.parse(localStorage.getItem("players") || "[]");

    setPlayers((prev) => {
      const updatedPlayers = [...prev];
      const playerToReset = updatedPlayers[index];

      const saved = savedPlayers.find(
        (p) => p.userName === playerToReset.userName
      );
      const scores = saved ? saved.scores : playerToReset.scores;

      const updatedPlayer = {
        ...playerToReset,
        initialNumber: Math.floor(Math.random() * 100),
        resetCounter: playerToReset.resetCounter + 1,
        scores,
      };

      updatedPlayers[index] = updatedPlayer;

      const mergedPlayers = [
        ...savedPlayers.filter((p) => p.userName !== playerToReset.userName),
        updatedPlayer,
      ];

      localStorage.setItem("players", JSON.stringify(mergedPlayers));
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
            <br />
            Gamer: {gamer.userName}
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
