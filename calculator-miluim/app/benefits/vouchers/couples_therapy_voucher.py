from app.models.benefits_details import Voucher
from app.models.reservist_profile import ReservistProfile

MINIMUM_AMOUNT_OF_DAYS = 30
COMPENSATION = 1500


class CouplesTherapyVoucher(Voucher):
    def __init__(self):
        super().__init__(
            title="שובר טיפול זוגי",
            description="סיוע במימון טיפול זוגי בסכום חד פעמי עד 1500 ש״ח, הסיוע יינתן בכפוף לתצהיר + קבלה שיגיש משרת המילואים ולא יותר מהתשלום בפועל",
            link_to_source="https://www.miluim.idf.il/articles-list/%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%9E%D7%A2%D7%A0%D7%A7%D7%99%D7%9D-%D7%9C%D7%9E%D7%A9%D7%A8%D7%AA%D7%99-%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9D-%D7%91%D7%9E%D7%9C%D7%97%D7%9E%D7%AA-%D7%97%D7%A8%D7%91%D7%95%D7%AA-%D7%91%D7%A8%D7%96%D7%9C/",
            amount=0,
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return reservist.calculate_total_days() >= MINIMUM_AMOUNT_OF_DAYS

    def calculate(self, reservist: ReservistProfile) -> None:
        self.amount = COMPENSATION


