from nba_api.stats.static import players
from nba_api.stats.endpoints import playergamelog
from nba_api.stats.endpoints import commonplayerinfo

def get_all_players():
    return players.get_players()

def get_player_name(player_id: int) -> str:
    all_players = get_all_players()

    for p in all_players:
        if p["id"] == player_id:
            return p["full_name"]

    return f"Player {player_id}"

def get_player_game_log(player_id, season="2023-24"):
    gamelog = playergamelog.PlayerGameLog(
        player_id=player_id,
        season=season
    )
    return gamelog.get_dict()

from nba_api.stats.endpoints import commonplayerinfo

def get_player_team_id(player_id: int) -> int:
    info = commonplayerinfo.CommonPlayerInfo(player_id=player_id)
    data = info.get_dict()

    result = data["resultSets"][0]
    headers = result["headers"]
    row = result["rowSet"][0]

    team_id_index = headers.index("TEAM_ID")
    return row[team_id_index]

def get_player_team_info(player_id: int):
    info = commonplayerinfo.CommonPlayerInfo(player_id=player_id)
    data = info.get_dict()

    result = data["resultSets"][0]
    headers = result["headers"]
    row = result["rowSet"][0]

    return {
        "team_id": row[headers.index("TEAM_ID")],
        "team_name": row[headers.index("TEAM_NAME")],
        "team_city": row[headers.index("TEAM_CITY")],
        "team_abbreviation": row[headers.index("TEAM_ABBREVIATION")],
    }
