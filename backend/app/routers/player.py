from fastapi import APIRouter, HTTPException

from app.services.player_analysis import analyze_player
from app.exceptions import (
    PlayerDataNotFound,
    PlayerDataInvalid,
)

router = APIRouter(prefix="/players", tags=["Players"])


@router.get("/{player_id}")
def get_player_analysis(player_id: int, line: float = 25.5):
    try:
        return analyze_player(player_id, line)

    except PlayerDataNotFound as e:
        raise HTTPException(status_code=404, detail=str(e))

    except PlayerDataInvalid as e:
        raise HTTPException(status_code=422, detail=str(e))

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Erro interno ao processar os dados do jogador"
        )
