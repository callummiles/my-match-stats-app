function LeagueMatchList({ matches }) {
  if (!matches || matches.length === 0) {
    return <div>No matches available.</div>;
  }

  const listCountry = matches[0].league.country;
  const listLeague = matches[0].league.name;
  const listSeason = matches[0].league.selectedSeason;

  return (
    <div>
      <h2>
        {listCountry} {listLeague}
        {' | '}
        {listSeason}
      </h2>
      <ul>
        {matches.map((match) => (
          <li key={match.id}>
            {new Date(match.date).toLocaleDateString()}
            {' | '}
            {new Date(match.date).toLocaleTimeString()}: {match.homeTeam}{' '}
            {match.score} {match.awayTeam} {'('}
            {match.id}
            {')'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeagueMatchList;
