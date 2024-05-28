import { useState } from 'react';

function MatchSearch({ onSearch }) {
  const [matchId, setMatchId] = useState('');

  const handleSearch = async () => {
    if (matchId.trim()) {
      const response = await fetch(`http://localhost:3000/data/${matchId}`);
      const data = await response.json();
      onSearch(data);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
          placeholder="Enter Match ID"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default MatchSearch;
