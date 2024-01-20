from app.models.reservist_profile import ReservistProfile
from app.models.benefits_details import Grant
from app.models.consts import Academy


class BGUGrant(Grant):
    def __init__(self):
        super().__init__(
            title="אוניברסיטת בן גוריון - מענק לימודים",
            description="האוניברסיטה החליטה על מספר אפיקי סיוע לסטודנטיות והסטודנטים שלנו, במטרה לתת מענה באופן רחב ככל הניתן לצרכים השונים שמעוררת התקופה בה אנו נמצאים.",
            link_to_source="https://www.bgu.ac.il/standarts/iron-swords/iron-swords-aid-for-students/",
            amount=0,
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return Academy.BGU == reservist.academy

    def calculate(self, reservist: ReservistProfile) -> None:
        self.amount = 1200
