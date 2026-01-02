from fastapi import FastAPI
from app.routers import health

app = FastAPI(
    title="NBA Players Props Analytics",
    description = "API para análise de performance de jogadores da NBA em cenários semelhantes",
    version = "0.1.0"
)

@app.get("/")
def root():
    return {"status": "ok"}

app.include_router(health.router)