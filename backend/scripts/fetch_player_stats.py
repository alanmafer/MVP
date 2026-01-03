import json
from app.services.nba_client import get_player_game_log

PLAYER_ID = 203999 # Nicola Jokic
SEASON = "2023-24"

data = get_player_game_log(PLAYER_ID, season=SEASON)

result = data["resultSets"][0]
headers = result["headers"]
rows = result["rowSet"]

def idx(field_name):
    if field_name not in headers:
        raise ValueError(f"Campo '{field_name}' não encontrado nos headers: {headers}")
    return headers.index(field_name)

IDX_GAME_ID = headers.index("Game_ID")
IDX_GAME_DATE = headers.index("GAME_DATE")
IDX_MATCHUP = headers.index("MATCHUP")
IDX_MIN = headers.index("MIN")
IDX_PTS = headers.index("FGM")
IDX_FGA = headers.index("FGA")
IDX_FG3A = headers.index("FG3A")

clean_games = []

for row in rows:
    game = {
        "game_id": row[IDX_GAME_ID],
        "date": row[IDX_GAME_DATE],
        "matchup": row[IDX_MATCHUP],
        "minutes": int(row[IDX_MIN]),
        "points": int(row[IDX_PTS]),
        "fga": int(row[IDX_FGA]),
        "fg3a": int(row[IDX_FG3A]),
    }
    clean_games.append(game)
    
output_path = f"data/processed/players_stats_{PLAYER_ID}.json"

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(clean_games, f, indent=2)

print(f"{len(clean_games)} games saved to {output_path}")
