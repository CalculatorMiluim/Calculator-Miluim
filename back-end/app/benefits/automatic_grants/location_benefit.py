from app.models.benefits_details import AutomaticGrant
from app.models.consts import Location
from app.models.reservist_profile import ReservistProfile

class LocationGrant(AutomaticGrant):
    def __init__(self):
        super().__init__(
            title="Location grant",
            description="Location grant description",
            link_to_source="https://www.locationgrantlink.com",
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return reservist.location == Location.SOUTH or reservist.location == Location.NORTH

    def calculate(self, reservist: ReservistProfile) -> None:
        switcher = {
            Location.SOUTH: 300,
            Location.NORTH: 500,
        }
        self.financial_reward = switcher.get(reservist.location, 0)