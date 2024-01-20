from app.models.reservist_profile import ReservistProfile
from app.models.benefits_details import Grant
from app.models.consts import Academy


class HaifaGrant(Grant):
    def __init__(self):
        super().__init__(
            title="אוניברסיטת חיפה - מענק לימודים",
            description="כל סטודנט וסטודנטית משרתי מילואים בצו 8 יקבלו מלגת עידוד",
            link_to_source="https://dekanat.haifa.ac.il/%D7%A2%D7%93%D7%9B%D7%95%D7%A0%D7%99-%D7%93%D7%99%D7%A7%D7%A0%D7%90%D7%98-%D7%94%D7%A1%D7%98%D7%95%D7%93%D7%A0%D7%98%D7%99%D7%9D-%D7%97%D7%A8%D7%91%D7%95%D7%AA-%D7%91%D7%A8%D7%96%D7%9C/",
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return Academy.HAIFA == reservist.academy

    def calculate(self, reservist: ReservistProfile) -> None:
        self.financial_reward = 2000
