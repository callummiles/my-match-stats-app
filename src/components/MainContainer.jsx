import { useState } from 'react';
import LeagueSearch from './LeagueSearch.jsx';
import LeagueMatchList from './LeagueMatchList.jsx';
import MatchSearch from './MatchSearch.jsx';
import MatchDetails from './MatchDetails.jsx';
import ShotTable from './ShotTable.jsx';

function MainContainer() {
  const [match, setMatch] = useState(null);
  const [matches, setMatches] = useState([]);
  const [shots, setShots] = useState([]);

  const handleLeagueSearch = (data) => {
    setMatches(data);
  };

  const handleSearch = (data) => {
    const formattedShots = data.shots.map((shot) => ({
      ...shot,
      expectedGoals: parseFloat(shot.expectedGoals).toFixed(4),
      expectedGoalsOnTarget:
        shot.expectedGoalsOnTarget !== null
          ? parseFloat(shot.expectedGoalsOnTarget).toFixed(4)
          : '0.0000',
      x: parseFloat(shot.x).toFixed(2),
      y: parseFloat(shot.y).toFixed(2),
    }));
    setMatch(data);
    setShots(formattedShots);
  };

  console.log(shots);

  return (
    <div>
      <div>
        <LeagueSearch onSearch={handleLeagueSearch} />
        <MatchSearch onSearch={handleSearch} />
      </div>
      <div>
        <MatchDetails match={match} />
        <ShotTable shots={shots} />
        <LeagueMatchList matches={matches} />
      </div>
    </div>
  );
}

export default MainContainer;
