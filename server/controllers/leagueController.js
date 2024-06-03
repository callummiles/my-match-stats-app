import Match from '../models/matchModel.js';

export const getLeagues = async (req, res) => {
  try {
    const leagues = await Match.aggregate([
      {
        $group: {
          _id: {
            id: '$league.id',
            name: '$league.name',
            selectedSeason: '$league.selectedSeason',
            country: '$league.country',
          },
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id.id',
          name: '$_id.name',
          selectedSeason: '$_id.selectedSeason',
          country: '$_id.country',
        },
      },
    ]);

    console.log(leagues);
    res.json(leagues);
  } catch (error) {
    console.error('Error fetching leagues:', error);
    res.status(500).json({ error: 'Error fetching leagues' });
  }
};
