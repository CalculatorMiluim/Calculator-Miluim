from app.models.benefits_details import Voucher
from app.models.consts import CombatLevel
from app.models.reservist_profile import ReservistProfile


class Vacation(Voucher):
    def __init__(self):
        super().__init__(
            name="שובר חופשה",
            title="שובר חופשה",
            description="שובר חופשה למשרתי מילואים ששירותו לפחות 60 ימי שמ״פ במסגרת מלחמת חרבות ברזל",
            link_to_source="https://www.miluim.idf.il/articles-list/%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%9E%D7%A2%D7%A0%D7%A7%D7%99%D7%9D-%D7%9C%D7%9E%D7%A9%D7%A8%D7%AA%D7%99-%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9D-%D7%91%D7%9E%D7%9C%D7%97%D7%9E%D7%AA-%D7%97%D7%A8%D7%91%D7%95%D7%AA-%D7%91%D7%A8%D7%96%D7%9C/",
            amount=0,
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return reservist.calculate_total_days() >= 60

    def calculate(self, reservist_profile: ReservistProfile) -> None:
        if (reservist_profile.combat_level == CombatLevel.COMBAT_UNIT and
                reservist_profile.family_status.children and reservist_profile.family_status.children.is_under_14):
            self.amount = 4500
        elif reservist_profile.combat_level == CombatLevel.COMBAT_UNIT:
            self.amount = 3500
            return
        elif reservist_profile.family_status.children and reservist_profile.family_status.children.is_under_14:
            self.amount = 2000
        else:
            self.amount = 1500

