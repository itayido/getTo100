import "../App.css";

function Header({ addGamer, startButton, setStartButton }) {
  return (
    <>
      <h1>Get To 100!!!</h1>
      <button
        onClick={() => {
          const userName = prompt("Enter your name");
          addGamer(userName);
        }}
      >
        Add gamer
      </button>
      <button onClick={() => setStartButton(!startButton)}>
        {startButton ? "End" : "Start"}
      </button>
    </>
  );
}

export default Header;
