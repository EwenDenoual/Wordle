import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/word", {
          headers: {
            "x-api-key": "chocapik"
          }
        });

        if (!response.ok) {
          throw new Error("Erreur API");
        }

        const data = await response.json();

        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) {
    return <h1>Chargement...</h1>;
  }

  if (error) {
    return <h1>Erreur : {error}</h1>;
  }

  return (
    <div>
      <h1>Liste des utilisateurs</h1>

      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App;