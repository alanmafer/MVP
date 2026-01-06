from nba_api.stats.static import players
from nba_api.stats.endpoints import playergamelog


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
