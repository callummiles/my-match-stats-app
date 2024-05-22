import { useState } from 'react';

function MatchSearch({ onSearch }) {
  const [matchId, setMatchId] = useState('');

  const handleSearch = () => {
    if (matchId.trim()) {
      onSearch(matchId.trim());
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
        <button onClick={handleSearch}></button>
      </div>
    </div>
  );
}

export default MatchSearch;
