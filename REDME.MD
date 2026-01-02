# NBA Player Props Analytics

Projeto de análise estatística para **player props da NBA**, com foco em **pontos por jogador**.

O objetivo do sistema é **organizar dados históricos da NBA para mostrar como jogadores performam em cenários estatisticamente semelhantes ao jogo atual**, ajudando na tomada de decisão baseada em contexto — não em previsões mágicas.

---

## 🎯 Objetivo do MVP

Este MVP responde a uma pergunta simples e clara:

> *Como este jogador costuma pontuar em jogos com contexto semelhante ao de hoje?*

O sistema **não faz previsões**, **não recomenda apostas** e **não garante resultados**.  
Ele organiza dados históricos de forma contextual e transparente.

---

## 🧠 Conceito-chave

Um **cenário semelhante** é definido por combinações de fatores como:
- Minutos em quadra
- Papel ofensivo (volume de arremessos)
- Casa vs fora
- Adversário e defesa contra a posição

As métricas são calculadas apenas sobre jogos que atendem a esses critérios.

---

## 🏗️ Arquitetura (MVP)

- **Backend:** Python + FastAPI  
- **Banco de dados:** PostgreSQL (ou SQLite em ambiente local)  
- **Fonte de dados:** NBA (via `nba_api`)  
- **Frontend:** React / Next.js (consome API REST)  
- **Atualização de dados:** Jobs agendados (scripts Python)

O projeto segue uma arquitetura **monolítica organizada**, adequada para MVP e evolução gradual.

---

## 📁 Estrutura do projeto

# NBA Player Props Analytics

Projeto de análise estatística para **player props da NBA**, com foco em **pontos por jogador**.

O objetivo do sistema é **organizar dados históricos da NBA para mostrar como jogadores performam em cenários estatisticamente semelhantes ao jogo atual**, ajudando na tomada de decisão baseada em contexto — não em previsões mágicas.

---

## 🎯 Objetivo do MVP

Este MVP responde a uma pergunta simples e clara:

> *Como este jogador costuma pontuar em jogos com contexto semelhante ao de hoje?*

O sistema **não faz previsões**, **não recomenda apostas** e **não garante resultados**.  
Ele organiza dados históricos de forma contextual e transparente.

---

## 🧠 Conceito-chave

Um **cenário semelhante** é definido por combinações de fatores como:
- Minutos em quadra
- Papel ofensivo (volume de arremessos)
- Casa vs fora
- Adversário e defesa contra a posição

As métricas são calculadas apenas sobre jogos que atendem a esses critérios.

---

## 🏗️ Arquitetura (MVP)

- **Backend:** Python + FastAPI  
- **Banco de dados:** PostgreSQL (ou SQLite em ambiente local)  
- **Fonte de dados:** NBA (via `nba_api`)  
- **Frontend:** React / Next.js (consome API REST)  
- **Atualização de dados:** Jobs agendados (scripts Python)

O projeto segue uma arquitetura **monolítica organizada**, adequada para MVP e evolução gradual.

---

## 📁 Estrutura do projeto


/
├── backend/
│ └── app/
│ ├── routers/
│ ├── services/
│ ├── models/
│ └── main.py
│
├── frontend/
│
└── README.md


---

## 🚀 Como rodar o backend localmente

### Pré-requisitos
- Python 3.10+
- Git

### Passo a passo

```bash
# clonar o repositório
git clone <url-do-repositorio>
cd backend

# criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# instalar dependências
pip install -r requirements.txt

# subir a API
uvicorn app.main:app --reload

A API ficará disponível em:

http://localhost:8000

Documentação automática: http://localhost:8000/docs

✅ Status do projeto

🟡 Em desenvolvimento (MVP)

 Escopo definido

 Pergunta central definida

 Ingestão de dados NBA

 Modelo de dados

 Métricas de cenários semelhantes

 Frontend MVP

 Deploy

⚠️ Aviso importante

Este projeto:

não oferece apostas

não sugere picks

não garante resultados financeiros

É uma ferramenta de organização e análise de dados esportivos, destinada a estudo e apoio à decisão.

📌 Próximos passos

Implementar ingestão de dados da NBA

Persistir dados no banco

Criar métricas de cenários semelhantes

Expor resultados via API

Construir frontend simples para visualização

🧩 Filosofia do projeto

Simplicidade primeiro.
Clareza antes de complexidade.
Transparência acima de promessas.


---

Esse README cumpre três funções importantes:
- deixa claro **o que o projeto é**
- deixa claro **o que ele não é**
- facilita voltar ao projeto daqui a semanas sem confusão

Se quiser, no próximo passo posso:
- ajustar o README para inglês
- adaptar para portfólio profissional
- ou alinhar exatamente com a **Sprint 1** (dados NBA)

Você está construindo do jeito certo.
