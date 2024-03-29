import math

from app.models.benefits_details import AutomaticGrant
from app.models.reservist_profile import ReservistProfile
from app.models.consts import CombatLevel

MINIMUM_AMOUNT_OF_DAYS = 45


class IncreasedHomeEconomicsGrant(AutomaticGrant):

    def __init__(self):
        super().__init__(
            title="מענק כלכלת בית מוגדל",
            description="מענק כלכלת הבית מוגדל, לשנת 2024, בגובה 2,500₪ (במקום 1,250₪) למי שמוגדר ״משרת מילואים פעיל״, וביצע 45 ימים בצו 8 במערך הלוחם (יחידות בייעוד 0-2 ויחידות נוספות).",
            link_to_source="https://www.miluim.idf.il/articles-list/%D7%9E%D7%92%D7%95%D7%99%D7%99%D7%A1%D7%99%D7%9D-%D7%9C%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9D",
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return (reservist.active_reservist and reservist.calculate_total_days() >= MINIMUM_AMOUNT_OF_DAYS and
                reservist.combat_level == CombatLevel.COMBAT_UNIT)

    def calculate(self, reservist: ReservistProfile) -> None:
        self.financial_reward = 2500

