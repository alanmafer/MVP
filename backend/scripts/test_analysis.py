import json
from app.services.player_analysis import analyze_player

with open("data/processed/player_stats_203999.json", "r", encoding="utf-8") as f:
    data = json.load(f)

games = data["games"]

print("Total games:", len(games))
print("Sample game:", games[0])

result = analyze_player(games)

print(result)
