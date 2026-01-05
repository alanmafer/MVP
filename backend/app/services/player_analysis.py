import json

from app.services.metrics import (
    average,
    median,
    over_percentage,
    distribution,
)
from app.services.cache import (
    get_cache_path,
    is_cache_valid,
    load_cache,
    save_cache,
)
from app.exceptions import (
    PlayerDataNotFound,
    PlayerDataInvalid,
)


def analyze_player(player_id: int, line: float = 25.5) -> dict:
    path = f"data/processed/player_stats_{player_id}.json"

    # =====================================================
    # Cache (arquivo)
    # =====================================================
    cache_path = get_cache_path(player_id, line)
    if is_cache_valid(cache_path):
        return load_cache(cache_path)

    # =====================================================
    # Leitura do arquivo
    # =====================================================
    try:
        with open(path, "r", encoding="utf-8") as f:
            games = json.load(f)
    except FileNotFoundError:
        raise PlayerDataNotFound(
            f"Dados do jogador {player_id} não encontrados"
        )
    except json.JSONDecodeError:
        raise PlayerDataInvalid(
            f"Dados do jogador {player_id} estão corrompidos"
        )

    # =====================================================
    # Validação mínima dos dados (PASSO 3)
    # =====================================================
    required_fields = {"points", "minutes", "matchup", "fga"}

    for g in games:
        if not required_fields.issubset(g.keys()):
            raise PlayerDataInvalid(
                f"Dados inválidos para o jogador {player_id}"
            )

    # =====================================================
    # Container de resultado
    # =====================================================
    result = {
        "player_id": player_id,
        "line": line,
        "scenarios": {}
    }

    # =====================================================
    # Métricas gerais
    # =====================================================
    points = [g["points"] for g in games]
    over_count, total_games, over_pct = over_percentage(points, line)

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
        "average": (
            average(high_minutes_points)
            if high_minutes_points else None
        ),
        "over_pct": (
            over_percentage(high_minutes_points, line)[2]
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
            "over_pct": over_percentage(home_points, line)[2],
        },
        "away": {
            "games": len(away_points),
            "average": average(away_points),
            "median": median(away_points),
            "over_pct": over_percentage(away_points, line)[2],
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
            "over_pct": over_percentage(high_fga_points, line)[2],
        },
        "low_fga": {
            "games": len(low_fga_points),
            "average": average(low_fga_points),
            "over_pct": over_percentage(low_fga_points, line)[2],
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
            "over_pct": over_percentage(last5_points, line)[2],
        },
        "last_10": {
            "games": len(last10_points),
            "average": average(last10_points),
            "median": median(last10_points),
            "over_pct": over_percentage(last10_points, line)[2],
        },
    }
    
    # =====================================================
    # Cenário 5 — Últimos 5 jogos em casa
    # =====================================================
    last_5_home_games = [
        g for g in games[:5]
        if "@" not in g["matchup"]
    ]

    last_5_home_points = [g["points"] for g in last_5_home_games]

    result["scenarios"]["last_5_home"] = {
        "games": len(last_5_home_points),
        "average": (
            average(last_5_home_points)
            if last_5_home_points else None
        ),
        "median": (
            median(last_5_home_points)
            if last_5_home_points else None
        ),
        "over_pct": (
            over_percentage(last_5_home_points, line)[2]
            if last_5_home_points else None
        ),
    }


    # =====================================================
    # Salvar cache e retornar
    # =====================================================
    save_cache(cache_path, result)
    return result
