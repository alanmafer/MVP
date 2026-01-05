import json
import os
import time

CACHE_DIR = "data/cache"
CACHE_TTL_SECONDS =  6 * 60 * 60 # 6 horas

def get_cache_path(player_id: int, line: float) -> str:
    filename = f"player_{player_id}_line_{line}.json"
    return os.path.join(CACHE_DIR, filename)

def is_cache_valid(path: str) -> bool:
    if not os.path.exists(path):
        return False
    
    last_modified = os.path.getmtime(path)
    age = time.time() - last_modified
    return age < CACHE_TTL_SECONDS

def load_cache(path:str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)
    
def save_cache(path: str, data: dict):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        
 