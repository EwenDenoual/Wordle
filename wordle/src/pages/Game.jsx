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
  const [status, setStatus] = useState(isGoodWord(word, target));
  const [absentLetters, setAbsentLetters] = useState([]);

  function handleSubmit() {
    if (word.length !== 5) {
      return;
    }

    const result = isGoodWord(word.toLowerCase(), target);

    setStatus(result);

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
      handleSubmit();
      setTestedWords((prev) => [...prev, word]);
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
      <div className="status-container">

        {status.map((s, index) => (
        <div key={index} className={`status-card ${s}`}>
          <h2>{word[index]}</h2>
        </div>
        ))}
      </div>
      <div className="input-container">

      </div>
      <div>
        <Clavier onKeyClick={handleKeyClick} absentLetters={absentLetters}/>
     
          <div className="special-keys">
             <Key letter="Effacer" onClick={handleEffacer} />
             <Key letter="Entrer" onClick={handleEntrer} />
          </div>
          <div>
             <h3>Mots testés :</h3>
             {testedWords.map((word, index) => (
               <p key={index}>{word}</p>
             ))}
           </div>
         </div>
    </div>
  );
}

export default Game;
