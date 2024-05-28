import Match from '../models/matchModel.js';
import { fetchMatchDetails } from '../utils/api.js';

export const getDataByMatchId = async (req, res) => {
  const { matchId } = req.params;
  try {
    console.log(`Checking DB for match ID ${matchId}.`);
    let match = await Match.findOne({ id: matchId });

    if (!match || !match.shots.length || !Object.keys(match.halfs).length) {
      console.log(
        `No detailed match data found in DB for match ID ${matchId}.`
      );
      const matchData = await fetchMatchDetails(matchId);

      if (!matchData) {
        return res.status(404).json({ error: 'Match not found.' });
      }

      const shots = matchData.content.shotmap.shots;
      const halfs = matchData.header.status.halfs;

      await Match.findOneAndUpdate(
        { id: matchId },
        { $set: { shots: shots, halfs: halfs } },
        { new: true }
      );

      if (!match) {
        return res.status(404).json({ error: 'Match not found.' });
      }
      console.log(
        `Fetched and updated match details from API for match ID ${matchId}.`
      );
    } else {
      console.log(`Detailed match data found in DB for match ID ${matchId}.`);
    }

    res.json(match);
  } catch (error) {
    console.error('Error fetching shots:', error);
    res.status(500).json({ error: 'Error fetching shots.' });
  }
};

export const addShots = async (req, res) => {
  const { matchId, shot } = req.body;
  try {
    const league = await Match.findOneAndUpdate(
      { 'matches.id': matchId },
      { $push: { 'matches:$:shots': shot } },
      { new: true }
    );
    if (!league) {
      return res.status(404).json({ error: 'Match not found.' });
    }
    res.status(201).json({ message: 'Shot data added successfully.' });
  } catch (error) {
    console.error('Error adding shot data:', error);
    res.status(500).json({ error: 'Error adding shot data.' });
  }
};
