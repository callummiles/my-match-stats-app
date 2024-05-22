import express from 'express';
import ViteExpress from 'vite-express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/message', (_, res) => res.send('Hello from Express!'));

app.get('/api/matchDetails', async (req, res) => {
  const matchId = req.query.matchId;

  if (!matchId) {
    return res.status(400).json({ error: 'matchId parameter required.' });
  }

  try {
    const response = await fetch(
      `https://www.fotmob.com/api/matchDetails?matchId=${matchId}`
    );
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: 'Failed to fetch data from Fotmob API.' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
});

ViteExpress.listen(app, 3000, () => console.log('Server is listening...'));
