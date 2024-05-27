import Match from '../models/matchModel.js';
import { fetchMatchDetails } from '../utils/api.js';

export const getDataByMatchId = async (req, res) => {
  const { matchId } = req.params;
  try {
    const matchData = await fetchMatchDetails(matchId);

    if (!matchData) {
      return res.status(404).json({ error: 'Match not found.' });
    }

    const shots = matchData.content.shotmap.shots;
    const events = matchData.content.matchFacts.events.events;
    const halfs = matchData.header.status.halfs;

    console.log(events);

    const shotsResult = await Match.findOneAndUpdate(
      { id: matchId },
      { $set: { shots: shots } }
    );

    const halfsResult = await Match.findOneAndUpdate(
      { id: matchId },
      { $set: { halfs: halfs } }
    );

    const eventsResult = await Match.findOneAndUpdate(
      { id: matchId },
      { $set: { events: events } }
    );

    if (!shotsResult) {
      return res.status(404).json({ error: 'Match not found.' });
    }

    if (!halfsResult) {
      return res.status(404).json({ error: 'Match not found.' });
    }

    if (!eventsResult) {
      return res.status(404).json({ error: 'Match not found.' });
    }

    res.json({ message: `Data updated for match ${matchId}.` });
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
