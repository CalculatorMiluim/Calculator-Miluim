import math

from app.models.benefits_details import AutomaticGrant
from app.models.consts import CombatLevel
from app.models.reservist_profile import ReservistProfile


class PersonalExpensesGrant(AutomaticGrant):

    def __init__(self):
        super().__init__(
            title="מענק הוצאות אישיות",
            description="מי ששירתו 8 ימים ומעלה במסגרת צו 8 בתקופת חרבות ברזל זכאים למענק עבור השתתפות בהוצאות אישיות.",
            link_to_source="https://www.kolzchut.org.il/he/%D7%9E%D7%A2%D7%A0%D7%A7_%D7%94%D7%95%D7%A6%D7%90%D7%95%D7%AA_%D7%90%D7%99%D7%A9%D7%99%D7%95%D7%AA_%D7%9C%D7%9E%D7%99_%D7%A9%D7%A9%D7%99%D7%A8%D7%AA%D7%95_%D7%91%D7%9E%D7%A1%D7%92%D7%A8%D7%AA_%D7%A6%D7%95_8_%D7%91%D7%9E%D7%9C%D7%97%D7%9E%D7%AA_%D7%97%D7%A8%D7%91%D7%95%D7%AA_%D7%91%D7%A8%D7%96%D7%9C",
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return reservist.days_in_tzav_8 >= 8

    def calculate(self, reservist: ReservistProfile) -> None:
        self.financial_reward = 1100


