from dataclasses import dataclass

from backend.models.BenefitDetails import Voucher


@dataclass
class Vacation(Voucher):
    name = "שובר חופשה"
    benefit_type = "voucher"
    title = "שובר חופשה"
    description = "שובר חופשה למשרתי מילואים ששירותו לפחות 60 ימי שמ״פ במסגרת מלחמת חרבות ברזל"
    link_to_source = "https://www.miluim.idf.il/articles-list/%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%9E%D7%A2%D7%A0%D7%A7%D7%99%D7%9D-%D7%9C%D7%9E%D7%A9%D7%A8%D7%AA%D7%99-%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9D-%D7%91%D7%9E%D7%9C%D7%97%D7%9E%D7%AA-%D7%97%D7%A8%D7%91%D7%95%D7%AA-%D7%91%D7%A8%D7%96%D7%9C/"

    @staticmethod
    def is_eligible(reservist_profile) -> bool:
        return reservist_profile.days_in_war >= 60

    def calculate(self, reservist_profile) -> int:
        if reservist_profile.is_combat_unit and reservist_profile.has_kid_under_14:
            self.amount = 4500

        if reservist_profile.is_combat_unit:
            self.amount = 3500

        if reservist_profile.has_kid_under_14:
            self.amount = 2000

        self.amount = 1500
