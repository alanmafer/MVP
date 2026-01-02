from fastapi import FastAPI

app = FastAPI(title="NBA Players Props API")

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/health")
def health_check():
    return {"health":"green"}