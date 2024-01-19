import math

from app.models.benefits_details import AutomaticGrant
from app.models.reservist_profile import ReservistProfile
from app.models.consts import CombatLevel

MINIMUM_AMOUNT_OF_DAYS = 45


class HomeEconomicsGrant(AutomaticGrant):

    def __init__(self):
        super().__init__(
            title="מענק כלכלת בית מוגדל",
            description="מענק כלכלת הבית מוגדל, לשנת 2024, בגובה 2,500₪ (במקום 1,250₪) למי שמוגדר ״משרת מילואים פעיל״, וביצע 45 ימים בצו 8 במערך הלוחם (יחידות בייעוד 0-2 ויחידות נוספות).",
            link_to_source="https://www.miluim.idf.il/articles-list/%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%9E%D7%A2%D7%A0%D7%A7%D7%99%D7%9D-%D7%9C%D7%9E%D7%A9%D7%A8%D7%AA%D7%99-%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9D-%D7%91%D7%9E%D7%9C%D7%97%D7%9E%D7%AA-%D7%97%D7%A8%D7%91%D7%95%D7%AA-%D7%91%D7%A8%D7%96%D7%9C/",
            amount=0,
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return (reservist.active_reservist and reservist.calculate_total_days() >= MINIMUM_AMOUNT_OF_DAYS and
                reservist.combat_level == CombatLevel.COMBAT_UNIT)

    def calculate(self, reservist: ReservistProfile) -> None:
        self.amount = 2500

