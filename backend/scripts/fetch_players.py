import json
from app.services.nba_client import get_all_players

players = get_all_players()

with open("./data/raw/players.json", "w", encoding="utf-8") as f:
    json.dump(players, f, indent=2)
    
print(f"{len(players)} players saved")