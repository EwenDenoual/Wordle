import { useState, useEffect } from "react";

function Key({ letter, isGray = false, onClick }) {
  return (
    <button
      className={`key ${isGray ? "key-gray" : "key-default"}`}
      onClick={() => onClick(letter)}
    >
      {letter}
    </button>
  );
}

const rows = [
  ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
  ["W", "X", "C", "V", "B", "N",],
];

const allLetters = rows.flat();

function Clavier({ absentLetters = [], onKeyClick }) {
  return (
    <div className="clavier">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="clavier-row">
          {row.map((letter) => (
            <Key
              key={letter}
              letter={letter}
              isGray={absentLetters.includes(letter)}
              onClick={onKeyClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Test() {
  const [currentWord, setCurrentWord] = useState("");
  const [testedWords, setTestedWords] = useState([]);

  const handleKeyClick = (letter) => {
    setCurrentWord((prev) => prev + letter);
  };

  const handleEffacer = () => {
    setCurrentWord((prev) => prev.slice(0, -1));
  };

  const handleEntrer = () => {
    setTestedWords((prev) => [...prev, currentWord]);
    setCurrentWord("");
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
  }, [currentWord]);

  return (
    <div>
      <Clavier onKeyClick={handleKeyClick} />

      <div className="special-keys">
        <Key letter="Effacer" onClick={handleEffacer} />
        <Key letter="Entrer" onClick={handleEntrer} />
      </div>

      <p>Mot en cours : {currentWord}</p>

      <div>
        <h3>Mots testés :</h3>
        {testedWords.map((word, index) => (
          <p key={index}>{word}</p>
        ))}
      </div>
    </div>
  );
}

export default Key;
export { Clavier, Test };