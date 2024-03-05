import math

from app.models.benefits_details import AutomaticGrant
from app.models.reservist_profile import ReservistProfile
from app.models.consts import CombatLevel

MINIMUM_AMOUNT_OF_DAYS = 40
DAYS_INTERVAL = 10
COMBAT_COMPENSATION = 833
NON_COMBAT_COMPENSATION = 500


class IncreasedFamilyGrant(AutomaticGrant):

    def __init__(self):
        super().__init__(
            title="מענק משפחה מוגדל",
            description="מענק משפחתי מוגדל למשרתי מילואים שלהם ילד עד גיל 14 וביצעו לפחות 40 ימי שמ״פ",
            link_to_source="https://www.miluim.idf.il/articles-list/%D7%9E%D7%92%D7%95%D7%99%D7%99%D7%A1%D7%99%D7%9D-%D7%9C%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9D",
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return reservist.calculate_total_days() >= MINIMUM_AMOUNT_OF_DAYS and reservist.has_child_under_14

    def calculate(self, reservist: ReservistProfile) -> None:
        payment_multiplication = math.ceil((reservist.calculate_total_days() - MINIMUM_AMOUNT_OF_DAYS) / DAYS_INTERVAL)
        if reservist.has_child_under_14:
            if reservist.combat_level == CombatLevel.COMBAT_UNIT:
                self.financial_reward = COMBAT_COMPENSATION * payment_multiplication
            else:
                self.financial_reward = NON_COMBAT_COMPENSATION * payment_multiplication


