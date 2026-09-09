import { useState } from "react";

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
  ["W", "X", "C", "V", "B", "N"],
];

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
  const [absentLetters, setAbsentLetters] = useState([]);
  const [lastClicked, setLastClicked] = useState("");

  const handleKeyClick = (letter) => {
    setLastClicked(letter);
    setAbsentLetters((prev) => [...prev, letter]);
  };

  return (
    <div>
      <Clavier absentLetters={absentLetters} onKeyClick={handleKeyClick} />
      <p>Dernière lettre cliquée : {lastClicked}</p>
    </div>
  );
}

export default Key;
export { Clavier, Test };