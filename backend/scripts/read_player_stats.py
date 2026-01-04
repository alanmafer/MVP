import json

from app.services.metrics import (
    average,
    median,
    over_percentage,
    distribution,
)

# -----------------------------------
# Configuração
# -----------------------------------
PLAYER_ID = 203999
PATH = f"./data/processed/player_stats_{PLAYER_ID}.json"

# -----------------------------------
# Leitura dos dados
# -----------------------------------
with open(PATH, "r", encoding="utf-8") as f:
    games = json.load(f)

print(f"Total de jogos analisados: {len(games)}")

# -----------------------------------
# Pontos
# -----------------------------------
points = [g["points"] for g in games]

avg_points = average(points)
med_points = median(points)

print(f"\nMédia de pontos: {avg_points:.2f}")
print(f"Mediana de pontos: {med_points}")

# -----------------------------------
# Over / Under
# -----------------------------------
LINE = 25.5
over_count, total_games, over_pct = over_percentage(points, LINE)

print(f"\nOver {LINE}: {over_count} de {total_games} jogos")
print(f"Percentual de over: {over_pct:.1f}%")

# -----------------------------------
# Distribuição de pontos
# -----------------------------------
dist = distribution(points)

print("\nDistribuição de pontos (faixas de 5):")
for faixa, qtd in sorted(dist.items()):
    print(faixa, ":", qtd)

# -----------------------------------
# Cenário: muitos minutos
# -----------------------------------
high_minutes_games = [g for g in games if g["minutes"] >= 34]
high_points = [g["points"] for g in high_minutes_games]

print(f"\nJogos com >= 34 minutos: {len(high_points)}")

if high_points:
    avg_high = average(high_points)
    print(f"Média de pontos (>=34 minutos): {avg_high:.2f}")
else:
    print("Nenhum jogo com >= 34 minutos encontrado")
