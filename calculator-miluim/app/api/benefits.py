from fastapi import APIRouter

from app.models.schemas import ReservistProfile

benefits_router = APIRouter()


@benefits_router.post("/benefits/")
def calculate_benefits(reservis: ReservistProfile):
    return reservis.recruitment_dates
