# NBA Player Props Analytics

Projeto de análise estatística para **player props da NBA**, com foco inicial em **pontos por jogador**.

O sistema organiza dados históricos da NBA para mostrar **como jogadores performam em contextos semelhantes**, servindo como apoio à decisão — sem previsões mágicas e sem recomendações de aposta.

---

## 🎯 Objetivo do MVP

Responder à seguinte pergunta:

> Como um jogador da NBA costuma pontuar em jogos com contexto semelhante ao jogo atual?

O projeto:
- **não prevê resultados**
- **não sugere apostas**
- **não garante performance**
- organiza dados de forma clara, transparente e reproduzível

---

## 🧠 Conceito-chave

O MVP trabalha com a ideia de **cenários semelhantes**, baseados em fatores como:
- minutos em quadra
- volume ofensivo
- matchup
- histórico recente

Nesta fase inicial, o foco está na **ingestão e organização dos dados**, não em modelos preditivos.

---

## 🏗️ Arquitetura atual

- **Backend:** Python + FastAPI  
- **Fonte de dados:** NBA (via `nba_api`)  
- **Persistência atual:** arquivos JSON  
- **Banco de dados:** ainda não implementado  
- **Frontend:** ainda não implementado  

O projeto segue uma arquitetura simples e incremental, priorizando clareza e baixo acoplamento.

---

## 📁 Estrutura do projeto

backend/
├── app/
│ ├── main.py
│ ├── routers/
│ ├── services/
│ │ └── nba_client.py
│ └── models/
│
├── scripts/
│ ├── fetch_players.py
│ └── fetch_player_stats.py
│
├── data/
│ ├── raw/
│ │ └── player_stats_<id>.json
│ └── processed/
│ └── player_stats_<id>.json
│
├── requirements.txt
└── .gitignore


---

## 🚀 Como rodar os scripts

Ative o ambiente virtual e execute os scripts **como módulo**:

```bash
cd backend
venv\Scripts\activate   # Windows
# source venv/bin/activate  # Linux / macOS

python -m scripts.fetch_players
python -m scripts.fetch_player_stats

✅ Status do projeto

 Escopo definido

 Backend estruturado

 Integração com NBA API

 Dados brutos coletados

 Dados normalizados em JSON

 Métricas analíticas

 Banco de dados

 API de consulta

 Frontend

⚠️ Aviso legal

Este projeto é apenas uma ferramenta de análise de dados esportivos.
Não oferece apostas, não recomenda picks e não garante resultados financeiros.

