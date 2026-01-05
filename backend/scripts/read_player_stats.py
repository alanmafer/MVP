import json
import pprint

from app.services.metrics import (
    average,
    median,
    over_percentage,
    distribution,
)

# =====================================================
# Configuração
# =====================================================
PLAYER_ID = 203999
LINE = 25.5
PATH = f"./data/processed/player_stats_{PLAYER_ID}.json"

# =====================================================
# Leitura dos dados
# =====================================================
with open(PATH, "r", encoding="utf-8") as f:
    games = json.load(f)

# =====================================================
# Container de resultado (produto)
# =====================================================
result = {
    "player_id": PLAYER_ID,
    "line": LINE,
    "scenarios": {}
}

# =====================================================
# Métricas gerais
# =====================================================
points = [g["points"] for g in games]
over_count, total_games, over_pct = over_percentage(points, LINE)

result["scenarios"]["overall"] = {
    "games": len(points),
    "average": average(points),
    "median": median(points),
    "over": {
        "count": over_count,
        "total": total_games,
        "percentage": over_pct,
    },
    "distribution": distribution(points),
}

# =====================================================
# Cenário 1 — Muitos minutos
# =====================================================
high_minutes_games = [g for g in games if g["minutes"] >= 34]
high_minutes_points = [g["points"] for g in high_minutes_games]

result["scenarios"]["high_minutes"] = {
    "threshold": 34,
    "games": len(high_minutes_points),
    "average": average(high_minutes_points) if high_minutes_points else None,
    "over_pct": (
        over_percentage(high_minutes_points, LINE)[2]
        if high_minutes_points else None
    ),
}

# =====================================================
# Cenário 2 — Casa vs Fora
# =====================================================
home_games = []
away_games = []

for g in games:
    if "@" in g["matchup"]:
        away_games.append(g)
    else:
        home_games.append(g)

home_points = [g["points"] for g in home_games]
away_points = [g["points"] for g in away_games]

result["scenarios"]["home_away"] = {
    "home": {
        "games": len(home_points),
        "average": average(home_points),
        "median": median(home_points),
        "over_pct": over_percentage(home_points, LINE)[2],
    },
    "away": {
        "games": len(away_points),
        "average": average(away_points),
        "median": median(away_points),
        "over_pct": over_percentage(away_points, LINE)[2],
    },
}

# =====================================================
# Cenário 3 — Volume ofensivo (FGA)
# =====================================================
fgas = [g["fga"] for g in games]
avg_fga = average(fgas)

high_fga_games = [g for g in games if g["fga"] >= avg_fga]
low_fga_games = [g for g in games if g["fga"] < avg_fga]

high_fga_points = [g["points"] for g in high_fga_games]
low_fga_points = [g["points"] for g in low_fga_games]

result["scenarios"]["offensive_volume"] = {
    "fga_average": avg_fga,
    "high_fga": {
        "games": len(high_fga_points),
        "average": average(high_fga_points),
        "over_pct": over_percentage(high_fga_points, LINE)[2],
    },
    "low_fga": {
        "games": len(low_fga_points),
        "average": average(low_fga_points),
        "over_pct": over_percentage(low_fga_points, LINE)[2],
    },
}

# =====================================================
# Cenário 4 — Recência
# =====================================================
last_5 = games[:5]
last_10 = games[:10]

last5_points = [g["points"] for g in last_5]
last10_points = [g["points"] for g in last_10]

result["scenarios"]["recency"] = {
    "last_5": {
        "games": len(last5_points),
        "average": average(last5_points),
        "median": median(last5_points),
        "over_pct": over_percentage(last5_points, LINE)[2],
    },
    "last_10": {
        "games": len(last10_points),
        "average": average(last10_points),
        "median": median(last10_points),
        "over_pct": over_percentage(last10_points, LINE)[2],
    },
}

# =====================================================
# Debug final — visão do produto
# =====================================================
pprint.pprint(result)
