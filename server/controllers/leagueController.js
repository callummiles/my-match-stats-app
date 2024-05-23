import League from '../models/leagueModel.js';
import { fetchLeagues } from '../utils/api.js';

export const getLeagues = async (req, res) => {
  try {
    let leagues = await League.find({});
    if (leagues.length === 0) {
      const leaguesData = await fetchLeagues();
      leagues = leaguesData.flatMap((country) => country.leagues);

      await League.insertMany(leagues, { ordered: false });
      console.log('Leagues fetched from API and stored in DB.');
    }
    res.json(leagues);
  } catch (error) {
    console.error('Error fetching leagues:', error);
    res.status(500).json({ error: 'Error fetching leagues' });
  }
};

export const addLeague = async (req, res) => {
  const league = new League(req.body);
  try {
    await league.save();
    res.status(201).json({ message: 'League added successfully' });
  } catch (error) {
    console.error('Error adding league:', error);
    res.status(500).json({ error: 'Error adding league. ' });
  }
};
