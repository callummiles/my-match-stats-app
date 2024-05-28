import { useState } from 'react';

function LeagueSearch({ onSearch }) {
  const [leagueId, setLeagueId] = useState('');
  const [season, setSeason] = useState('');

  const handleSearch = async () => {
    if (leagueId.trim() && season.trim()) {
      try {
        console.log(
          `Searching for league ID ${leagueId} and season ${season}.`
        );
        const response = await fetch(
          `http://localhost:3000/matches/${leagueId}/${season}`
        );
        const data = await response.json();
        console.log(
          `Received data for league ID ${leagueId} and season ${season}`
        );
        onSearch(data);
      } catch (error) {
        console.error(
          `Error fetching matches for league ID ${leagueId} and season ${season}: `,
          error
        );
      }
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={leagueId}
          onChange={(e) => setLeagueId(e.target.value)}
          placeholder="Enter League ID"
        />
        <input
          type="text"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          placeholder="Enter Season (e.g. 2023-2024)"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default LeagueSearch;
