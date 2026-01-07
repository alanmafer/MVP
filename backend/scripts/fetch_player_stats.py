import json
from app.services.nba_client import get_player_game_log, get_player_name
from app.services.nba_client import (
    get_player_game_log,
    get_player_name,
    get_player_team_id,
    get_player_team_info
)

def fetch_player(player_id: int):
    SEASONS = ["2024-25", "2025-26"]
    all_games = []
    player_name = get_player_name(player_id)
    team_id = get_player_team_id(player_id)
    team_info = get_player_team_info(player_id)

    for season in SEASONS:
        print(f"Fetching season {season}...")
        data = get_player_game_log(player_id, season=season)

        result = data["resultSets"][0]
        headers = result["headers"]
        rows = result["rowSet"]

        def idx(field_name):
            if field_name not in headers:
                raise ValueError(
                    f"Campo '{field_name}' não encontrado nos headers: {headers}"
                )
            return headers.index(field_name)

        IDX_GAME_ID = idx("Game_ID")
        IDX_GAME_DATE = idx("GAME_DATE")
        IDX_MATCHUP = idx("MATCHUP")
        IDX_MIN = idx("MIN")
        IDX_PTS = idx("PTS")
        IDX_FGA = idx("FGA")
        IDX_FG3A = idx("FG3A")

        for row in rows:
            game = {
                "game_id": row[IDX_GAME_ID],
                "date": row[IDX_GAME_DATE],
                "season": season,
                "matchup": row[IDX_MATCHUP],
                "minutes": int(row[IDX_MIN]),
                "points": int(row[IDX_PTS]),
                "fga": int(row[IDX_FGA]),
                "fg3a": int(row[IDX_FG3A]),
            }
            all_games.append(game)

    # ordenar por data (mais recente primeiro)
    all_games = sorted(
        all_games,
        key=lambda g: g["date"],
        reverse=True,
    )

    output_path = f"data/processed/player_stats_{player_id}.json"
    
    output = {
        "player_id": player_id,
        "player_name": player_name,
        "team_id": team_info["team_id"],
        "team_name": team_info["team_name"],
        "team_city": team_info["team_city"],
        "team_abbreviation": team_info["team_abbreviation"],
        "team_id": team_id,
        "games": all_games,
    }

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2)        

    print(f"{len(all_games)} games saved to {output_path}")

if __name__ == "__main__":
    # jogador padrão para teste manual
    fetch_player(203999)
