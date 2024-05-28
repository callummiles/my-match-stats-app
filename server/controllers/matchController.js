import League from '../models/leagueModel.js';
import Match from '../models/matchModel.js';
import { fetchMatchDataByLeagueAndSeason } from '../utils/api.js';

export const getMatchesByLeagueIdAndSeason = async (req, res) => {
  const { leagueId, season } = req.params;
  const decodedSeason = season.replace('-', '%2F');

  try {
    console.log(
      `Checking DB for matches in league ${leagueId} and season ${season}`
    );
    let matches = await Match.find({
      'league.id': leagueId,
      'league.selectedSeason': decodedSeason,
    });

    if (matches.length === 0) {
      console.log(
        `No matches found in DB for league ${leagueId} and season ${season}`
      );
      const fetchedMatchData = await fetchMatchDataByLeagueAndSeason(
        leagueId,
        decodedSeason
      );
      const leagueDetails = fetchedMatchData.details;
      const allMatches = fetchedMatchData.matches.allMatches;

      const bulkOps = allMatches.map((match) => ({
        updateOne: {
          filter: { id: match.id },
          update: {
            $setOnInsert: {
              id: match.id,
              date: match.status.utcTime,
              round: match.roundName,
              homeTeam: match.home.name,
              homeId: match.home.id,
              awayTeam: match.away.name,
              awayId: match.away.id,
              score: match.status.scoreStr,
              league: leagueDetails,
              shots: [],
              halfs: {},
              url: match.pageUrl,
            },
          },
          upsert: true,
        },
      }));

      if (bulkOps.length > 0) {
        const bulkWriteResult = await Match.bulkWrite(bulkOps);
        console.log(
          `Fetched and stored matches from API for league ${leagueId} and season ${season}`
        );
        console.log('Upsert count: ', bulkWriteResult.upsertedCount);
        console.log('Matched count: ', bulkWriteResult.matchedCount);
        matches = await Match.find({
          'league.id': leagueId,
          'league.selectedSeason': decodedSeason,
        });
      }

      // matches = await Match.insertMany(
      //   allMatches.map((match) => ({
      //     id: match.id,
      //     date: match.status.utcTime,
      //     round: match.roundName,
      //     homeTeam: match.home.name,
      //     homeId: match.home.id,
      //     awayTeam: match.away.name,
      //     awayId: match.away.id,
      //     score: match.status.scoreStr,
      //     league: leagueDetails,
      //     shots: [],
      //     halfs: {},
      //     url: match.pageUrl,
      //   }))
      // );
      // console.log('Matches fetched from API and stored in DB.');
    } else {
      console.log(
        `Matches found in database for league ${leagueId} and season ${season}.`
      );
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
