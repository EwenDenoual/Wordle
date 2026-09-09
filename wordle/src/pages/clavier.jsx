import { useState, useEffect } from "react";

import Key from "./Key";

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


export default Clavier;