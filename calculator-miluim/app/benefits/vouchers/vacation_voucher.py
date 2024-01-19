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
            link_to_source="https://www.miluim.idf.il/articles-list/%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%9E%D7%A2%D7%A0%D7%A7%D7%99%D7%9D-%D7%9C%D7%9E%D7%A9%D7%A8%D7%AA%D7%99-%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9D-%D7%91%D7%9E%D7%9C%D7%97%D7%9E%D7%AA-%D7%97%D7%A8%D7%91%D7%95%D7%AA-%D7%91%D7%A8%D7%96%D7%9C/",
            amount=0,
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return reservist.calculate_total_days() >= MINIMUM_AMOUNT_OF_DAYS

    def calculate(self, reservist: ReservistProfile) -> None:
        if reservist.combat_level == CombatLevel.COMBAT_UNIT and reservist.has_child_under_14():
            self.amount = COMBAT_WITH_CHILD_UNDER_14_COMPENSATION
        elif reservist.combat_level == CombatLevel.COMBAT_UNIT:
            self.amount = COMBAT_WITHOUT_CHILDREN_COMPENSATION
            return
        elif reservist.has_child_under_14():
            self.amount = NON_COMBAT_WITH_CHILD_COMPENSATION
        else:
            self.amount = NON_COMBAT_WITHOUT_CHILD_COMPENSATION

