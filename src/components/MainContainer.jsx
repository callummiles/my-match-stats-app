import { useState } from 'react';
import MatchSearch from './MatchSearch.jsx';
import ShotTable from './ShotTable.jsx';

function MainContainer() {
  const [shots, setShots] = useState([]);

  const fetchMatchDetails = async (matchId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/matchDetails?matchId=${matchId}`
      );
      const data = await response.json();
      if (data.content && data.content.shotmap && data.content.shotmap.shots) {
        console.log(data.content.shotmap.shots);
        setShots(data.content.shotmap.shots);
      } else {
        console.error('Invalid data structure:', data);
      }
    } catch (error) {
      console.error('Error fetching match details:', error);
    }
  };

  //   fetch('http://localhost:3000/api/matchDetails?matchId=4446289', {})
  //     .then((response) => response.json())
  //     .then((data) => console.log(data.content.shotmap.shots));

  return (
    <div>
      <MatchSearch onSearch={fetchMatchDetails} />
      <ShotTable shots={shots} />
    </div>
  );
}

export default MainContainer;
