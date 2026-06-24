const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
app.use(cors());

// Force la fermeture de la connexion TCP après chaque réponse : sans ça, le
// navigateur réutilise une connexion keep-alive déjà ouverte, et Swarm ne
// refait pas de choix de routage entre les réplicas à chaque requête.
app.use((req, res, next) => {
  res.set('Connection', 'close');
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!', instance: os.hostname() });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
  });
}

module.exports = app;
