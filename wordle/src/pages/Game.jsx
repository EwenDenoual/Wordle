import { useEffect, useState } from "react";
import "./Game.css";
import Clavier from "./clavier";
import Key from "./Key";

const rows = [
  ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
  ["W", "X", "C", "V", "B", "N",],
];

const allLetters = rows.flat();

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
        setTarget("words"); // Valeur par défaut en cas d'erreur
      });
  }, []);
  return target;
}

function Game() {
  const [word, setWord] = useState("");
  const [testedWords, setTestedWords] = useState([]);
  const target = Gettargetword();
  const [attempts, setAttempts] = useState([]);
  const [absentLetters, setAbsentLetters] = useState([]);

  function handleSubmit() {
    if (word.length !== 5) {
      return;
    }

    if (attempts.length >= 5) {
    return;
    }

    const result = isGoodWord(word.toLowerCase(), target);

    setAttempts((prev) => [...prev, result]);

    const newAbsentLetters = word
    .toUpperCase()
    .split("")
    .filter((letter, index) => result[index] === "false");

    setAbsentLetters((prev) => [
      ...new Set([...prev, ...newAbsentLetters]),
    ]);
  }

  const handleKeyClick = (letter) => {
      if (word.length >= 5) {
        return;
      }
      setWord((prev) => prev + letter);
    };
  
    const handleEffacer = () => {
      setWord((prev) => prev.slice(0, -1));
    };
  
    const handleEntrer = () => {
      if (word.length !== 5) {
        return;
      }

      if (attempts.length >= 5) {
        return;
      }

      setTestedWords((prev) => [...prev, word]);

      handleSubmit();

      setWord("");
    };
  
    useEffect(() => {
      const handlePhysicalKeyDown = (e) => {
        const key = e.key.toUpperCase();
  
        if (key === "ENTER") {
          handleEntrer();
        } else if (key === "BACKSPACE") {
          handleEffacer();
        } else if (allLetters.includes(key)) {
          handleKeyClick(key);
        }
      };
  
      window.addEventListener("keydown", handlePhysicalKeyDown);
  
      return () => {
        window.removeEventListener("keydown", handlePhysicalKeyDown);
      };
    }, [word]);

  return (
    <div className="page">
      <div className="game-board">

        {Array.from({ length: 5 }).map((_, rowIndex) => {
        const attempt = attempts[rowIndex];

        const currentWord =
          rowIndex === attempts.length
            ? word
            :testedWords[rowIndex] || "";
      
        return (
          <div className="status-container" key={rowIndex}>
            {Array.from({ length: 5 }).map((_, colIndex) => {

              const status = attempt
                ? attempt[colIndex]
                : "empty";

              const letter = currentWord[colIndex] || "";

              return (
                <div
                  key={colIndex}
                  className={`status-card ${status}`}
                >
                  <h2>{letter}</h2>
                </div>
              );
            })}
          </div>
        );
      })}
      </div>
      <div className="input-container">

      </div>
      <div>
        <Clavier onKeyClick={handleKeyClick} absentLetters={absentLetters}/>
     
          <div className="special-keys">
             <Key letter="Effacer" onClick={handleEffacer} />
             <Key letter="Entrer" onClick={handleEntrer} />
          </div>
         </div>
    </div>
  );
}

export default Game;
