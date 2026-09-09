import { useLocation, useNavigate } from "react-router-dom";

function Resultat() {
  const location = useLocation();
  const navigate = useNavigate();

  const { win, target, attempts } = location.state || {};

  if (win) {
    return (
      <div className="page">
        <h1>🎉 Victoire !</h1>
        <p>Bravo, tu as trouvé le mot !</p>
        <p>Nombre de tentatives : {attempts}</p>

        <button onClick={() => navigate("/Game")}>
          Rejouer
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>😢 Défaite</h1>
      <p>Tu as utilisé tes 5 tentatives.</p>
      <p>Le mot était : <strong>{target}</strong></p>

      <button onClick={() => navigate("/Game")}>
        Rejouer
      </button>
    </div>
  );
}

export default Resultat;
