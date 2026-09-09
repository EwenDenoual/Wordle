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



// function App() {
//   const [absentLetters, setAbsentLetters] = useState([]);

//   const handleKeyClick = (letter) => {
//     console.log("Lettre cliquée :", letter);
//     setAbsentLetters((prev) => [...prev, letter]);
//   };

//   return <Clavier absentLetters={absentLetters} onKeyClick={handleKeyClick} />;
// }





// function App() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/word", {
//           headers: {
//             "x-api-key": "chocapik"
//           }
//         });

//         if (!response.ok) {
//           throw new Error("Erreur API");
//         }

//         const data = await response.json();

//         setUsers(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUsers();
//   }, []);

//   if (loading) {
//     return <h1>Chargement...</h1>;
//   }

//   if (error) {
//     return <h1>Erreur : {error}</h1>;
//   }

//   return (
//     <div>
//       <h1>Liste des utilisateurs</h1>

//       {users.map((user) => (
//         <div key={user.id}>
//           <h2>{user.name}</h2>
//           <p>{user.email}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

export default App;