import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [message, setMessage] = useState('Chargement...');
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/message`)
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setInstance(data.instance ?? null);
      })
      .catch(() => setMessage('Erreur de connexion au backend'));
  }, []);

  return (
    <div>
      <h1>TP2 - Docker Pipeline</h1>
      <p>{message}</p>
      {instance && (
        <p>
          Répondu par l&apos;instance backend : <code>{instance}</code>
        </p>
      )}
    </div>
  );
}

export default App;
