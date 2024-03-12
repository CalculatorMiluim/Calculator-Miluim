from fastapi import APIRouter
from app.location.location import LocationHelper

location_router = APIRouter()

location_helper = LocationHelper()

@location_router.get("/location")
def search_locations(text: str):
    locations = location_helper.search_location(text)
    return {
        'locations': locations
    }