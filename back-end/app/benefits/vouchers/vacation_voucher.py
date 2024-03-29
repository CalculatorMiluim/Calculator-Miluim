from app.models.benefits_details import Voucher
from app.models.consts import CombatLevel
from app.models.reservist_profile import ReservistProfile


MINIMUM_AMOUNT_OF_DAYS = 60
COMBAT_WITH_CHILD_UNDER_14_COMPENSATION = 4500
COMBAT_WITHOUT_CHILDREN_COMPENSATION = 3500
NON_COMBAT_WITH_CHILD_COMPENSATION = 2500
NON_COMBAT_WITHOUT_CHILD_COMPENSATION = 1500


class VacationVoucher(Voucher):
    def __init__(self):
        super().__init__(
            title="שובר חופשה",
            description="שובר חופשה למשרתי מילואים ששירותו לפחות 60 ימי שמ״פ במסגרת מלחמת חרבות ברזל, שובר אישי יישלח במהלך חציון ב׳ באופן אוטומטי פרטני, למימוש עד סוף שנת 2026",
            link_to_source="https://www.miluim.idf.il/articles-list/%D7%9E%D7%92%D7%95%D7%99%D7%99%D7%A1%D7%99%D7%9D-%D7%9C%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9D",
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return reservist.days_in_tzav_8 >= MINIMUM_AMOUNT_OF_DAYS

    def calculate(self, reservist: ReservistProfile) -> None:
        if reservist.combat_level == CombatLevel.COMBAT_UNIT and reservist.has_child_under_14:
            self.financial_reward = COMBAT_WITH_CHILD_UNDER_14_COMPENSATION
        
        elif reservist.combat_level == CombatLevel.COMBAT_UNIT:
            self.financial_reward = COMBAT_WITHOUT_CHILDREN_COMPENSATION
            return
         
        elif reservist.has_child_under_14:
            self.financial_reward = NON_COMBAT_WITH_CHILD_COMPENSATION

        else:
            self.financial_reward = NON_COMBAT_WITHOUT_CHILD_COMPENSATION
