import { useState } from "react";
import "./App.css";
import GameBoards from "./components/GameBoards";
import Header from "./components/Header";

function App() {
  const [players, setPlayers] = useState([]);
  const [startButton, setStartButton] = useState(false);

  function addGamer(userName) {
    const savedPlayers = JSON.parse(localStorage.getItem("players") || "[]");

    const existingPlayer = savedPlayers.find(
      (player) => player.userName === userName
    );

    let newPlayerList;

    if (existingPlayer) {
      const alreadyIn = players.some(
        (p) => p.userName === existingPlayer.userName
      );
      if (!alreadyIn) {
        newPlayerList = [...players, existingPlayer];
        setPlayers(newPlayerList);
      }
    } else {
      const newPlayer = {
        userName,
        scores: [],
        initialNumber: Math.floor(Math.random() * 100),
        resetCounter: 0,
      };
      newPlayerList = [...players, newPlayer];
      setPlayers(newPlayerList);

      localStorage.setItem(
        "players",
        JSON.stringify([...savedPlayers, newPlayer])
      );
    }
  }

  return (
    <>
      <Header
        addGamer={addGamer}
        startButton={startButton}
        setStartButton={setStartButton}
      />
      <GameBoards
        players={players}
        startButton={startButton}
        setPlayers={setPlayers}
      />
    </>
  );
}

export default App;
