# 📄 `TECH_NOTES.md` (versão atualizada)


# Notas Técnicas – NBA Player Props Analytics

Este documento registra decisões técnicas e aprendizados ao longo do desenvolvimento do projeto.

---

## 🏁 Sprint 0 — Fundação

### Decisões
- Backend em Python com FastAPI
- Ambiente isolado com `venv`
- Estrutura clara de pastas (`app`, `scripts`, `data`)
- Execução do servidor via `python -m uvicorn`

### Aprendizados
- Importação em Python depende do diretório de execução
- Scripts devem ser executados como módulo (`python -m`)
- Pastas importáveis precisam de `__init__.py`

---

## 🏁 Sprint 1 — Ingestão de dados NBA

### Objetivo
Coletar dados reais da NBA e salvá-los de forma reproduzível e compreensível.

### Implementações
- Integração com `nba_api`
- Cliente centralizado (`nba_client.py`)
- Scripts de coleta independentes
- Separação entre dados brutos (`raw`) e processados (`processed`)
- Normalização manual de dados de jogos por jogador

### Aprendizados importantes
- A estrutura real da API deve ser inspecionada (`headers`)
- Nunca assumir nomes de campos sem validar
- Dados brutos são para máquinas; dados processados são para humanos
- Falhar cedo com mensagens claras facilita debug

---

## 🧠 Princípios adotados
- Simplicidade antes de abstração
- Scripts reexecutáveis
- Dados sob controle antes de métricas
- Progresso incremental por sprints curtas

---

## 🔜 Próxima decisão técnica
Definir a abordagem da Sprint 2:
- métricas simples direto nos arquivos JSON
- ou introdução de banco de dados relacional
