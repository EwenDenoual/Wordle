import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Game from "./pages/Game";
import Resultat from "./pages/Resultat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/Resultat" element={<Resultat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;