import { useState } from "react";
import "./App.css";
import GameBoards from "./components/GameBoards";
import Header from "./components/Header";

function App() {
  const [players, setPlayers] = useState([]);
  const [startButton, setStartButton] = useState(false);
  function addGamer(userName) {
    const newPlayer = {
      userName: userName,
      scores: [],
      initialNumber: Math.floor(Math.random() * 100),
      resetCounter: 0,
    };
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
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
