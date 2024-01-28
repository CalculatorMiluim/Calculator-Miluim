from app.models.benefits_details import AutomaticGrant
from app.models.reservist_profile import ReservistProfile


MINIMUM_AMOUNT_OF_DAYS = 45


class FamilyWithChildUnder14(AutomaticGrant):

    def __init__(self):
        super().__init__(
            title="מענק משפחה להורה לילד עד גיל 14",
            description="מי ששירתו 8 ימים או יותר במסגרת צו 8 בתקופת מלחמת חרבות ברזל, ויש להם ילד עד גיל 14, זכאים למענק משפחה.",
            link_to_source="https://www.kolzchut.org.il/he/%D7%9E%D7%A2%D7%A0%D7%A7_%D7%9E%D7%A9%D7%A4%D7%97%D7%94_%D7%9C%D7%9E%D7%99_%D7%A9%D7%A9%D7%99%D7%A8%D7%AA%D7%95_%D7%91%D7%9E%D7%A1%D7%92%D7%A8%D7%AA_%D7%A6%D7%95_8_%D7%91%D7%9E%D7%9C%D7%97%D7%9E%D7%AA_%D7%97%D7%A8%D7%91%D7%95%D7%AA_%D7%91%D7%A8%D7%96%D7%9C",
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return reservist.days_in_tzav_8 >= 8 and reservist.has_child_under_14

    def calculate(self, reservist: ReservistProfile) -> None:
        self.financial_reward = 2000

