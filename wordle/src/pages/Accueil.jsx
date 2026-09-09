import { useNavigate } from "react-router-dom";
import "./Accueil.css";

function Accueil() {
  const navigate = useNavigate();

  return (
    <div className="accueil">
      <div className="contenu">
        <h1>Bienvenue sur mon site</h1>

        <p>
          Découvrez notre wordle !
        </p>

        <button 
          onClick={() => navigate("/suivant")}
        >
          Commencer
        </button>
      </div>
    </div>
  );
}

export default Accueil;