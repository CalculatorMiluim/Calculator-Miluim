from app.models.reservist_profile import ReservistProfile
from app.models.benefits_details import Grant
from app.models.consts import Academy

REGULAR_GRANT_DAYS = 15
REGULAR_GRANT_COMPENSATION = 3000
BIG_GRANT_DAYS = 30
BIG_GRANT_COMPENSATION = 6000


class TechnionUniversityGrant(Grant):
    def __init__(self):
        super().__init__(
            title="הטכניון - מענק לימודים",
            description="לתואר ראשון או תארים מתקדמים, לטובת תשלומי שכר לימוד, שכר דירה במעונות הטכניון ותשלומים נלווים לשכר הלימוד",
            link_to_source="https://www.technion.ac.il/2023/11/%D7%A1%D7%99%D7%95%D7%A2-%D7%A9%D7%9C-%D7%94%D7%98%D7%9B%D7%A0%D7%99%D7%95%D7%9F-%D7%9C%D7%9E%D7%A9%D7%A8%D7%AA%D7%95%D7%AA-%D7%95%D7%9E%D7%A9%D7%A8%D7%AA%D7%99-%D7%94%D7%9E%D7%99%D7%9C%D7%95%D7%90/",
            financial_reward=0,
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return reservist.calculate_total_days() >= REGULAR_GRANT_DAYS and Academy.TECHNION == reservist.academy

    def calculate(self, reservist: ReservistProfile) -> None:
        if REGULAR_GRANT_DAYS <= reservist.calculate_total_days() < BIG_GRANT_DAYS:
            self.financial_reward = REGULAR_GRANT_COMPENSATION
        elif reservist.calculate_total_days() >= BIG_GRANT_DAYS:
            self.financial_reward = BIG_GRANT_COMPENSATION
