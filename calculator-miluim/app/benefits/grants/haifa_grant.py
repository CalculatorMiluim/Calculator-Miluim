from app.models.reservist_profile import ReservistProfile
from app.models.benefits_details import Grant
from app.models.consts import Academy


class HaifaGrant(Grant):
    def __init__(self):
        super().__init__(
            title="אוניברסיטת חיפה - מענק לימודים",
            description="כל סטודנט וסטודנטית משרתי מילואים בצו 8 יקבלו מלגת עידוד",
            link_to_source="https://www.bgu.ac.il/standarts/iron-swords/iron-swords-aid-for-students/",
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return Academy.BGU == reservist.academy

    def calculate(self, reservist: ReservistProfile) -> None:
        self.financial_reward = 1200
