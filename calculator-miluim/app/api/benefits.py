from fastapi import APIRouter

from app.models.schemas import ReservistProfile

from app.calculator.benefits_calculator import calculate_benefits_for_reservist

benefits_router = APIRouter()


@benefits_router.post("/benefits/")
def calculate_benefits(reservist: ReservistProfile):
    return calculate_benefits_for_reservist(reservist)


