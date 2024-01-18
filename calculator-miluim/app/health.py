from fastapi import APIRouter

health_router = APIRouter()


@health_router.get("/check/")
def health():
    return "ok"
