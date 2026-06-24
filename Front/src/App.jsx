import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const BURST_SIZE = 3;
const HISTORY_LIMIT = 10;

function App() {
  const [message, setMessage] = useState('En attente — clique sur le bouton pour tester.');
  const [instance, setInstance] = useState(null);
  const [history, setHistory] = useState([]);
  const [counts, setCounts] = useState({});

  const recordResponse = (data) => {
    setMessage(data.message);
    setInstance(data.instance ?? null);

    if (data.instance) {
      setHistory((prev) => [data.instance, ...prev].slice(0, HISTORY_LIMIT));
      setCounts((prev) => ({
        ...prev,
        [data.instance]: (prev[data.instance] ?? 0) + 1,
      }));
    }
  };

  const fetchMessage = () => {
    fetch(`${API_URL}/api/message`)
      .then((res) => res.json())
      .then(recordResponse)
      .catch(() => setMessage('Erreur de connexion au backend'));
  };

  const sendBurst = () => {
    for (let i = 0; i < BURST_SIZE; i += 1) {
      fetchMessage();
    }
  };

  return (
    <div>
      <h1>TP2 - Docker Pipeline</h1>
      <p>{message}</p>
      {instance && (
        <p>
          Répondu par l&apos;instance backend : <code>{instance}</code>
        </p>
      )}

      <p>
        <button onClick={sendBurst}>Envoyer {BURST_SIZE} requêtes</button>
      </p>

      {Object.keys(counts).length > 0 && (
        <div>
          <h2>Répartition des réponses par instance</h2>
          <ul>
            {Object.entries(counts).map(([id, count]) => (
              <li key={id}>
                <code>{id}</code> : {count}
              </li>
            ))}
          </ul>
        </div>
      )}

      {history.length > 0 && (
        <div>
          <h2>Historique des dernières réponses</h2>
          <ol>
            {history.map((id, index) => (
              <li key={`${index}-${id}`}>
                <code>{id}</code>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
