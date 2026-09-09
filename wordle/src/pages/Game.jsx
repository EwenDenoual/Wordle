import { useEffect, useState } from "react";
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

function Gettargetword() {
  const [target, setTarget] = useState("");
  useEffect(() => {
    fetch("/api/word?lang=fr", {
           headers: {
             "x-api-key": "chocapik"
           }
         })
      .then((response) => response.json())
      .then((data) => {
        setTarget(data.word);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du mot :", error);
      });
  }, []);
  return target;
}

function Game() {
  const [word, setWord] = useState("");
  const target = Gettargetword();
  const [status, setStatus] = useState(isGoodWord(word, target));

  function handleSubmit() {
    if (word.length !== 5) {
      return;
    }

    const result = isGoodWord(word.toLowerCase(), target);

    setStatus(result);
  }
  return (
    <div className="page">
      <div className="status-container">

        {status.map((s, index) => (
        <div key={index} className={`status-card ${s}`}>
          <h2>{word[index]}</h2>
        </div>
        ))}
      </div>
      <div className="input-container">

        <input
          type="text"
          maxLength="5"
          value={word}
          onChange={(event) => setWord(event.target.value)}
          placeholder="Entrez un mot"
        />

        <button onClick={handleSubmit}>
          Valider
        </button>

      </div>

    </div>
  );
}

export default Game;
