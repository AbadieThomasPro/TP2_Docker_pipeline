import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [message, setMessage] = useState('Chargement...');

  useEffect(() => {
    fetch(`${API_URL}/api/message`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Erreur de connexion au backend'));
  }, []);

  return (
    <div>
      <h1>TP2 - Docker Pipeline</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
