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

export default Key;
