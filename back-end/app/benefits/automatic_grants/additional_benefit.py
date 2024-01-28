from app.models.benefits_details import AutomaticGrant
from app.models.reservist_profile import ReservistProfile


class AdditionalBenefit(AutomaticGrant):

    def __init__(self):
        super().__init__(
            title="התגמול הנוסף",
            description="במסגרת חוק המילואים תשסח 2008, נקבע כי חייל מילואים זכאי, נוסף על תגמולים אחרים שלהם הוא זכאי על-פי כל דין (המשולמים על-ידי המוסד לביטוח לאומי), לתגמולים בשל שירות מילואים שביצע, וזאת במטרה לתגמל את חיילי המילואים המבצעים שירות מילואים פעיל וארוך בצהל",
            link_to_source="https://www.miluim.idf.il/articles-list/%D7%AA%D7%92%D7%9E%D7%95%D7%9C%D7%99%D7%9D",
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return reservist.calculate_total_days() >= 5

    def calculate(self, reservist: ReservistProfile) -> None:
        total_days = reservist.calculate_total_days()
        if 5 <= total_days < 10:
            self.financial_reward = 266
        elif 10 <= total_days < 15:
            self.financial_reward = 1410
        elif 15 <= total_days < 20:
            self.financial_reward = 2820
        elif 20 <= total_days < 37:
            self.financial_reward = 4230
        elif 37 <= total_days:
            self.financial_reward = 5640

