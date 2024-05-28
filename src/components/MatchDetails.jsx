function MatchDetails({ match }) {
  if (!match) {
    return <div>No match data available.</div>;
  }

  console.log(match);

  const goals = match.shots.filter((shot) => shot.eventType === 'Goal');

  return (
    <div>
      <h2>
        {match.homeTeam} vs {match.awayTeam}
      </h2>
      <p>Date: {new Date(match.date).toLocaleDateString()}</p>
      <p>Score: {match.score}</p>
      <h3>Goals:</h3>
      {goals.length > 0 ? (
        <ul>
          {goals.map((goal) => (
            <li key={goal.id}>
              {goal.playerName} {goal.min}&#39; (
              {goal.teamId === match.homeId ? match.homeTeam : match.awayTeam})
            </li>
          ))}
        </ul>
      ) : (
        <p>No goals in this match.</p>
      )}
    </div>
  );
}

export default MatchDetails;
