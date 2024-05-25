import fetch from 'node-fetch';

export const allowedLeagueIds = [
  38, 40, 46, 47, 48, 53, 54, 55, 57, 59, 61, 64, 67, 69, 71, 87, 108, 110, 111,
  113, 126, 130, 140, 146, 196, 223, 268, 9080,
];

export const fetchMatchDetails = async (matchId) => {
  try {
    const response = await fetch(
      // eslint-disable-next-line no-undef
      `${process.env.FOTMOB_MATCH_DETAILS_URL}${matchId}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch match stats data from Fotmob API.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching match details:', error);
    throw error;
  }
};

export const fetchLeagues = async () => {
  try {
    // eslint-disable-next-line no-undef
    const response = await fetch(process.env.FOTMOB_LEAGUES_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch leagues data from Fotmob API.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching leagues: ', error);
    throw error;
  }
};

export const fetchMatchesByLeague = async (leagueId) => {
  try {
    const response = await fetch(
      // eslint-disable-next-line no-undef
      `${process.env.FOTMOB_MATCHES_BY_LEAGUE_URL}${leagueId}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch match data from Fotmob API.');
    }
    const data = await response.json();
    return data.overview.leagueOverviewMatches;
  } catch (error) {
    console.error('Error fetching matches: ', error);
    throw error;
  }
};
