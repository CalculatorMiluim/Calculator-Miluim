import math

from app.models.benefits_details import AutomaticGrant
from app.models.consts import CombatLevel
from app.models.reservist_profile import ReservistProfile


class IncreasedPersonalExpensesGrant(AutomaticGrant):

    def __init__(self):
        super().__init__(
            title="מענק הוצאות אישיות מוגדל",
            description="המענק ישולם ביום ה-40 לשירות המילואים בצו 8 ״חרבות ברזל״ ובעבור כל 10 ימי מילואים שבוצעו עד 31/12/2023 (לדוגמה: בין 40-50 ימי שמ״פ ישולם 266/466₪, בין 50-60 ימי שמ״פ ישולם 266/466₪ - סה״כ 532/932₪ וכן הלאה).",
            link_to_source="https://www.miluim.idf.il/articles-list/%D7%AA%D7%92%D7%9E%D7%95%D7%9C%D7%99%D7%9D",
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return reservist.days_in_tzav_8 >= 40

    def calculate(self, reservist: ReservistProfile) -> None:
        amount_of_grants = math.ceil((reservist.days_in_tzav_8 - 39) / 10)
        if reservist.combat_level == CombatLevel.COMBAT_UNIT:
            self.financial_reward = 466 * amount_of_grants
        else:
            self.financial_reward = 266 * amount_of_grants


