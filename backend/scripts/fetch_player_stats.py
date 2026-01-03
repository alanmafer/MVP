import json
from app.services.nba_client import get_player_game_log

PLAYER_ID = 1631107
stats = get_player_game_log(PLAYER_ID)

with open(f"./data/raw/player_stats_{PLAYER_ID}.json", "w", encoding="utf-8") as f:
    json.dump(stats, f, indent=2)
    
print("Player sats saved")