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

