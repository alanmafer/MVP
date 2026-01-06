from collections import Counter


def analyze_player(games: list):
    # filtro defensivo (dados reais)
    clean_games = [
        g for g in games
        if g.get("points") is not None
        and g.get("minutes") is not None
        and g.get("fga") is not None
    ]

    if not clean_games:
        return {}

    # -----------------------------
    # Pontos
    # -----------------------------
    points = [g["points"] for g in clean_games]

    average = sum(points) / len(points)
    points_sorted = sorted(points)
    mid = len(points_sorted) // 2
    median = (
        (points_sorted[mid - 1] + points_sorted[mid]) / 2
        if len(points_sorted) % 2 == 0
        else points_sorted[mid]
    )

    # -----------------------------
    # Over / Under
    # -----------------------------
    LINE = 25.5
    over = [p for p in points if p > LINE]
    over_pct = (len(over) / len(points)) * 100

    # -----------------------------
    # Casa / Fora
    # -----------------------------
    home = [g for g in clean_games if "@" not in g["matchup"]]
    away = [g for g in clean_games if "@" in g["matchup"]]

    def analyze_subset(subset):
        if not subset:
            return {"average": 0, "median": 0, "over_pct": 0}

        pts = [g["points"] for g in subset]
        avg = sum(pts) / len(pts)
        pts_sorted = sorted(pts)
        m = len(pts_sorted) // 2
        med = (
            (pts_sorted[m - 1] + pts_sorted[m]) / 2
            if len(pts_sorted) % 2 == 0
            else pts_sorted[m]
        )
        over_local = [p for p in pts if p > LINE]
        pct = (len(over_local) / len(pts)) * 100

        return {
            "average": avg,
            "median": med,
            "over_pct": pct,
        }

    # -----------------------------
    # Recência
    # -----------------------------
    last_5 = clean_games[:5]
    last_10 = clean_games[:10]

    # -----------------------------
    # Volume ofensivo (FGA)
    # -----------------------------
    fga_values = [g["fga"] for g in clean_games]
    fga_avg = sum(fga_values) / len(fga_values)

    high_fga = [g for g in clean_games if g["fga"] >= fga_avg]
    low_fga = [g for g in clean_games if g["fga"] < fga_avg]

    return {
        "overall": {
            "average": average,
            "median": median,
            "over": {
                "line": LINE,
                "percentage": over_pct,
            },
        },
        "home_away": {
            "home": analyze_subset(home),
            "away": analyze_subset(away),
        },
        "recency": {
            "last_5": analyze_subset(last_5),
            "last_10": analyze_subset(last_10),
        },
        "offensive_volume": {
            "fga_average": fga_avg,
            "high_fga": analyze_subset(high_fga),
            "low_fga": analyze_subset(low_fga),
        },
    }
