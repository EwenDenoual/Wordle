import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Game from "./pages/Game";

import { useState } from "react";
import { Clavier } from "./clavier";

import { Test } from "./clavier";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/Test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;