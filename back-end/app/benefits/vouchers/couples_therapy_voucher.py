from app.models.benefits_details import Voucher
from app.models.reservist_profile import ReservistProfile

MINIMUM_AMOUNT_OF_DAYS = 30
COMPENSATION = 1500


class CouplesTherapyVoucher(Voucher):
    def __init__(self):
        super().__init__(
            title="שובר טיפול זוגי",
            description="סיוע במימון טיפול זוגי בסכום חד פעמי עד 1500 ש״ח, הסיוע יינתן בכפוף לתצהיר + קבלה שיגיש משרת המילואים ולא יותר מהתשלום בפועל",
            link_to_source="https://www.miluim.idf.il/articles-list/%D7%9E%D7%92%D7%95%D7%99%D7%99%D7%A1%D7%99%D7%9D-%D7%9C%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9D",
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return reservist.calculate_total_days() >= MINIMUM_AMOUNT_OF_DAYS

    def calculate(self, reservist: ReservistProfile) -> None:
        self.financial_reward = COMPENSATION


