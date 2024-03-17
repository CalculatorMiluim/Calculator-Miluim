from app.models.benefits_details import NoMoneyBenefit
from app.models.reservist_profile import ReservistProfile


MINIMUM_AMOUNT_OF_DAYS = 14


class ArrangementDaysGrant(NoMoneyBenefit):

    def __init__(self):
        super().__init__(
            title="ימי התרעננות",
            description="כל איש מילואים שביצע שירות מילואים בצו 8 באופי יחידה סגור(לא יומיות) ,זכאי לימי התארגנות בתום שירות המילואים וטרם חזרתו לשגרה האזרחית. כמות ימי ההתארגנות אליו זכאי איש המילואים משתנה בהתאם לכמות ימי המילואים שביצע בצו 8 עד לשחרור",
            link_to_source="https://www.miluim.idf.il/articles-list/%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%A9%D7%97%D7%A8%D7%95%D7%A8-%D7%A1%D7%93%D7%9B",
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return reservist.calculate_total_days() >= MINIMUM_AMOUNT_OF_DAYS

    def calculate(self, reservist: ReservistProfile) -> None:
        total_days = reservist.calculate_total_days()
        if 14 <= total_days < 21:
            self.other_reward = "2 ימי התארגנות"
        elif 21 <= total_days < 30:
            self.other_reward = "3 ימי התארגנות"
        elif 30 <= total_days < 40:
            self.other_reward = "4 ימי התארגנות"
        elif 40 <= total_days < 80:
            self.other_reward = "5 ימי התארגנות"
        elif 80 <= total_days:
            self.other_reward = "7 ימי התארגנות"

