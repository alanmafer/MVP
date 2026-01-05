from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import health, player, players_list

app = FastAPI(
    title="NBA Players Props Analytics",
    description="API para análise de performance de jogadores da NBA",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok"}

app.include_router(health.router)
app.include_router(player.router)
app.include_router(players_list.router)
