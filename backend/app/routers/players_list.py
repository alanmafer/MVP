import os
from fastapi import APIRouter

router = APIRouter(prefix="/players", tags=["Players"])

DATA_DIR = "data/processed"

@router.get("")
def list_players():
    players = []

    for filename in os.listdir(DATA_DIR):
        if filename.startswith("player_stats_") and filename.endswith(".json"):
            player_id = filename.replace("player_stats_", "").replace(".json", "")
            players.append(int(player_id))

    return {
        "count": len(players),
        "players": sorted(players),
    }
