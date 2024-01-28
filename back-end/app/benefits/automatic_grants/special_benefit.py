from app.models.benefits_details import AutomaticGrant
from app.models.reservist_profile import ReservistProfile


class SpecialBenefit(AutomaticGrant):

    def __init__(self):
        super().__init__(
            title="התגמול המיוחד",
            description="התגמול המיוחד משולם בין 32-60 ימים בכל שנה קלאנדרית ללא תלות בצו 8. התגמול המיוחד ימשיך להיספר גם עבור ימי השמפ שיבוצעו בשנת 2024, עבור כלל משרתי המילואים שגויסו מ-7/10/2023 בצו 8 בחרבות ברזל. התגמול המיוחד מעבר ליום ה-60 ישולם לכלל המשרתים בצו 8 (לאחר פקיעת תוקפו של צו 8 יחל חישוב מניין הימים מחדש)",
            link_to_source="https://www.miluim.idf.il/articles-list/%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%9E%D7%A2%D7%A0%D7%A7%D7%99%D7%9D-%D7%9C%D7%9E%D7%A9%D7%A8%D7%AA%D7%99-%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9D-%D7%91%D7%9E%D7%9C%D7%97%D7%9E%D7%AA-%D7%97%D7%A8%D7%91%D7%95%D7%AA-%D7%91%D7%A8%D7%96%D7%9C/",
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return reservist.calculate_total_days() >= 32

    def calculate(self, reservist: ReservistProfile) -> None:
        total_days = reservist.calculate_total_days()
        special_benefit_days = total_days - 32
        if reservist.is_commander:
            self.financial_reward = special_benefit_days * 133
        else:
            if reservist.days_in_tzav_8 > 28:
                self.financial_reward = reservist.days_in_tzav_8 * 133
            else:
                up_to_60 = min(special_benefit_days, 28)
                self.financial_reward = up_to_60 * 133


