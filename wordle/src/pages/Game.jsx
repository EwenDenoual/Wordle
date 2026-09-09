import { useState } from "react";
import "./Game.css";

function isGoodWord(word, target) {
  const status = ["false", "false", "false", "false", "false"];
  for (let i = 0; i < word.length; i++) {
    if (word[i] === target[i]) {
      status[i] = "good";
    } else if (target.includes(word[i])) {
      status[i] = "placed";
    } else {
      status[i] = "false";
    }
  }
  return status;
}

function Game() {
  const [status, setStatus] = useState(isGoodWord("hello", "world"));

  return (
    <div className="page">
      <div className="status-container">
        <div className={`status-card ${status[0]}`}>
          <h2>L</h2>
        </div>
        <div className={`status-card ${status[1]}`}>
          <h2>L</h2>
        </div>
        <div className={`status-card ${status[2]}`}>
          <h2>L</h2>
        </div>
        <div className={`status-card ${status[3]}`}>
          <h2>L</h2>
        </div>
        <div className={`status-card ${status[4]}`}>
          <h2>L</h2>
        </div>
      </div>

      <div className="buttons">
        <button onClick={() => setStatus(["good", status[1], status[2], status[3], status[4]])}>
          Good
        </button>

        <button onClick={() => setStatus(["placed", status[1], status[2], status[3], status[4]])}>
          Placed
        </button>

        <button onClick={() => setStatus(["false", status[1], status[2], status[3], status[4]])}>
          False
        </button>
      </div>
    </div>
  );
}

export default Game;
