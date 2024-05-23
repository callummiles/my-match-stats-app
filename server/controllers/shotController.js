import League from '../models/leagueModel.js';

export const getShotsByMatchId = async (req, res) => {
  const { matchId } = req.params;
  try {
    const league = await League.findOne(
      { 'matches.id': matchId },
      { 'matches.$': 1 }
    );
    if (!league) {
      return res.status(404).json({ error: 'Match not found.' });
    }
    const match = league.matches[0];
    res.json(match.shots);
  } catch (error) {
    console.error('Error fetching shots:', error);
    res.status(500).json({ error: 'Error fetching shots.' });
  }
};

export const addShots = async (req, res) => {
  const { matchId, shot } = req.body;
  try {
    const league = await League.findOneAndUpdate(
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
