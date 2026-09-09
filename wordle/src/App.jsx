import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import PageSuivante from "./pages/PageSuivante";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/suivant" element={<PageSuivante />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;