import json
import os
from fastapi import APIRouter, HTTPException
from app.services.player_analysis import analyze_player

router = APIRouter()

# -------------------------------------------------
# Path absoluto para data/processed
# -------------------------------------------------

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)

PROCESSED_PATH = os.path.join(BASE_DIR, "data", "processed")

# -------------------------------------------------
# Listar jogadores disponíveis (cacheados)
# -------------------------------------------------

@router.get("/players")
def list_players():
    players = []

    if not os.path.exists(PROCESSED_PATH):
        return {"players": []}

    for filename in os.listdir(PROCESSED_PATH):
        if not filename.startswith("player_stats_"):
            continue
        if not filename.endswith(".json"):
            continue

        file_path = os.path.join(PROCESSED_PATH, filename)

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)

            players.append({
                "id": data.get("player_id"),
                "name": data.get("player_name"),
            })

        except Exception:
            # se algum arquivo estiver corrompido, apenas ignora
            continue

    return {"players": players}

# -------------------------------------------------
# Analisar jogador específico
# -------------------------------------------------

@router.get("/players/{player_id}")
def get_player(player_id: int):
    file_path = os.path.join(
        PROCESSED_PATH,
        f"player_stats_{player_id}.json"
    )

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="Player not found or not processed yet"
        )

    with open(file_path, "r", encoding="utf-8") as f:
        raw_data = json.load(f)

    games = raw_data.get("games")

    if not games or not isinstance(games, list):
        raise HTTPException(
            status_code=404,
            detail="No games found for this player"
        )

    analysis = analyze_player(games)

    return {
        "player_id": raw_data.get("player_id"),
        "player_name": raw_data.get("player_name"),
        "line": 25.5,
        "scenarios": analysis,
    }
