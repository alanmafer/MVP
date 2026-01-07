export function getPlayerPhoto(playerId) {
  return `https://cdn.nba.com/headshots/nba/latest/260x190/${playerId}.png`;
}

export function getTeamLogo(teamId) {
  return `https://cdn.nba.com/logos/nba/${teamId}/global/L/logo.svg`;
}

export const NBA_TEAMS = [
  // EAST
  { id: 1610612737, name: "Atlanta Hawks", conference: "East" },
  { id: 1610612738, name: "Boston Celtics", conference: "East" },
  { id: 1610612741, name: "Chicago Bulls", conference: "East" },
  { id: 1610612766, name: "Charlotte Hornets", conference: "East" },
  { id: 1610612739, name: "Cleveland Cavaliers", conference: "East" },
  { id: 1610612765, name: "Detroit Pistons", conference: "East" },
  { id: 1610612754, name: "Indiana Pacers", conference: "East" },
  { id: 1610612748, name: "Miami Heat", conference: "East" },
  { id: 1610612749, name: "Milwaukee Bucks", conference: "East" },
  { id: 1610612751, name: "Brooklyn Nets", conference: "East" },
  { id: 1610612752, name: "New York Knicks", conference: "East" },
  { id: 1610612753, name: "Orlando Magic", conference: "East" },
  { id: 1610612755, name: "Philadelphia 76ers", conference: "East" },
  { id: 1610612761, name: "Toronto Raptors", conference: "East" },
  { id: 1610612764, name: "Washington Wizards", conference: "East" },

  // WEST
  { id: 1610612743, name: "Denver Nuggets", conference: "West" },
  { id: 1610612744, name: "Golden State Warriors", conference: "West" },
  { id: 1610612745, name: "Houston Rockets", conference: "West" },
  { id: 1610612746, name: "LA Clippers", conference: "West" },
  { id: 1610612747, name: "Los Angeles Lakers", conference: "West" },
  { id: 1610612740, name: "New Orleans Pelicans", conference: "West" },
  { id: 1610612750, name: "Minnesota Timberwolves", conference: "West" },
  { id: 1610612742, name: "Dallas Mavericks", conference: "West" },
  { id: 1610612756, name: "Phoenix Suns", conference: "West" },
  { id: 1610612757, name: "Portland Trail Blazers", conference: "West" },
  { id: 1610612758, name: "Sacramento Kings", conference: "West" },
  { id: 1610612759, name: "San Antonio Spurs", conference: "West" },
  { id: 1610612760, name: "Oklahoma City Thunder", conference: "West" },
  { id: 1610612762, name: "Utah Jazz", conference: "West" },
  { id: 1610612763, name: "Memphis Grizzlies", conference: "West" },
];



