import League from '../models/leagueModel.js';
import { fetchMatchesByLeague } from '../utils/api.js';

export const getMatchesByLeagueId = async (req, res) => {
  const leagueId = req.params.leagueId;
  try {
    const league = await League.findOne({ id: leagueId });
    if (!league) {
      return res.status(404).json({ error: 'League not found' });
    }
    let matches = league.matches;
    if (matches.length === 0) {
      matches = await fetchMatchesByLeague(leagueId);
      league.matches = matches;
      await league.save();
      console.log('Matches fetched from API and stored in DB.');
    }
    res.json(league.matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Error fetching matches' });
  }
};

export const addMatch = async (req, res) => {
  const leagueId = req.body.leagueId;
  const match = req.body.match;
  try {
    const league = await League.findOne({ id: leagueId });
    if (!league) {
      return res.status(404).json({ error: 'League not found ' });
    }
    league.matches.push(match);
    await league.save();
    res.status(201).json({ message: 'Match added successfully.' });
  } catch (error) {
    console.error('Error adding match:', error);
    res.status(500).json({ error: 'Error adding match' });
  }
};
