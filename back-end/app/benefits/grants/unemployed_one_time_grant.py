from app.models.reservist_profile import ReservistProfile
from app.models.benefits_details import Grant
from app.models.consts import EmploymentStatus


class UnEmployedOneTimeGrant(Grant):
    def __init__(self):
        super().__init__(
            title="מענק חד פעמי למשרתי המילואים שאינם עובדים",
            description="מענק חד פעמי בגובה 4,500 שח למשרת מילואים שביצע 45 ימי שמפ לפחות ובמשך 30 יום לאחר שחרורו - אינו שכיר, לא נמצא בחלת, אינו עצמאי ולא זכאי לדמי אבטלה.",
            link_to_source="https://wiz.medone.idf.il/MU/m/PYZ55QW4F9",
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return reservist.calculate_total_days() >= 45 and reservist.employment_status == EmploymentStatus.OTHER

    def calculate(self, reservist: ReservistProfile) -> None:
        self.financial_reward = 4500
