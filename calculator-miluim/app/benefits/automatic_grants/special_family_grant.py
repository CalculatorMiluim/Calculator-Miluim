from app.models.benefits_details import AutomaticGrant
from app.models.reservist_profile import ReservistProfile


MINIMUM_AMOUNT_OF_DAYS = 45


class SpecialFamilyGrant(AutomaticGrant):

    def __init__(self):
        super().__init__(
            title="מענק משפחה מיוחדת",
            description="מענק חד פעמי בגובה 2,000₪ סה״כ, שישולם למשרת מילואים ששירת 45 ימים ומעלה בצו 8 במלחמת 'חרבות ברזל' והוא הורה לתלמיד (עד גיל 21) עם צרכים מיוחדים.",
            link_to_source="https://www.miluim.idf.il/articles-list/%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%9E%D7%A2%D7%A0%D7%A7%D7%99%D7%9D-%D7%9C%D7%9E%D7%A9%D7%A8%D7%AA%D7%99-%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9D-%D7%91%D7%9E%D7%9C%D7%97%D7%9E%D7%AA-%D7%97%D7%A8%D7%91%D7%95%D7%AA-%D7%91%D7%A8%D7%96%D7%9C/",
            financial_reward=0,
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return reservist.calculate_total_days() >= MINIMUM_AMOUNT_OF_DAYS and reservist.has_child_with_special_needs()

    def calculate(self, reservist: ReservistProfile) -> None:
        self.financial_reward = 2000

