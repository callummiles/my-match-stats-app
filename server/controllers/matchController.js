import League from '../models/leagueModel.js';
import Match from '../models/matchModel.js';
import { fetchMatchDataByLeagueAndSeason } from '../utils/api.js';

export const getMatchesByLeagueIdAndSeason = async (req, res) => {
  const { leagueId, season } = req.params;
  const decodedSeason = season.replace('-', '%2F');
  try {
    let matches = await Match.find({
      'league.id': leagueId,
      'league.selectedSeason': decodedSeason,
    });
    if (matches.length === 0) {
      const fetchedMatchData = await fetchMatchDataByLeagueAndSeason(
        leagueId,
        decodedSeason
      );
      const leagueDetails = fetchedMatchData.details;
      const allMatches = fetchedMatchData.matches.allMatches;
      matches = await Match.insertMany(
        allMatches.map((match) => ({
          id: match.id,
          date: match.status.utcTime,
          round: match.round,
          homeTeam: match.home.name,
          awayTeam: match.away.name,
          score: match.status.scoreStr,
          league: leagueDetails,
          shots: [],
          url: match.pageUrl,
        }))
      );
      console.log('Matches fetched from API and stored in DB.');
    }
    res.json(matches);
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
