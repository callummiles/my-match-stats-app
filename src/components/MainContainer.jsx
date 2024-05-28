import { useState } from 'react';
import MatchSearch from './MatchSearch.jsx';
import MatchDetails from './MatchDetails.jsx';
// import ShotTable from './ShotTable.jsx';

function MainContainer() {
  // const [shots, setShots] = useState([]);

  // const fetchMatchDetails = async (matchId) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/api/matchDetails?matchId=${matchId}`
  //     );
  //     const data = await response.json();
  //     if (data.content && data.content.shotmap && data.content.shotmap.shots) {
  //       console.log(data.content.shotmap.shots);
  //       setShots(data.content.shotmap.shots);
  //     } else {
  //       console.error('Invalid data structure:', data);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching match details:', error);
  //   }
  // };

  // return (
  //   <div>
  //     <MatchSearch onSearch={fetchMatchDetails} />
  //     <ShotTable shots={shots} />
  //   </div>
  // );

  const [match, setMatch] = useState(null);

  const handleSearch = (data) => {
    setMatch(data);
  };

  return (
    <div>
      <MatchSearch onSearch={handleSearch} />
      <MatchDetails match={match} />
    </div>
  );
}

export default MainContainer;
