import League from '../models/leagueModel.js';
import { allowedLeagueIds, fetchLeagues } from '../utils/api.js';

export const getLeagues = async (req, res) => {
  try {
    console.log('Fetching existing leagues from database...');
    const existingLeagues = await League.find({});
    const existingLeagueIds = existingLeagues.map((league) => league.id);
    console.log('Existing League IDs:', existingLeagueIds);

    console.log('Fetching leagues from API...');
    const leaguesData = await fetchLeagues();
    const processedLeagues = [];

    leaguesData.countries.forEach((country) => {
      const countryCode = country.ccode;
      const countryName = country.name;

      country.leagues.forEach((league) => {
        if (
          allowedLeagueIds.includes(league.id) &&
          !existingLeagueIds.includes(league.id)
        ) {
          processedLeagues.push({
            id: league.id,
            name: league.name,
            localizedName: league.localizedName,
            country: countryName,
            code: countryCode,
          });
        }
      });
    });

    if (processedLeagues.length > 0) {
      await League.insertMany(processedLeagues, { ordered: false });
      console.log('Leagues fetched from API and stored in DB.');
    }

    // leagues = leaguesData
    //   .flatMap((country) => country.leagues)
    //   .filter((league) => allowedLeagueIds.includes(league.id))
    //   .map((league) => ({
    //     ...league,
    //     code: countries.ccode,
    //     country: countries.name,
    //   }));

    // await League.insertMany(leagues, { ordered: false });
    // console.log('Leagues fetched from API and stored in DB.');

    const updatedLeagues = await League.find({});

    res.json(updatedLeagues);
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
