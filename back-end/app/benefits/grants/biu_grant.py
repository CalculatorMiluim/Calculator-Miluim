from app.models.reservist_profile import ReservistProfile
from app.models.benefits_details import Grant
from app.models.consts import Academy, CombatLevel


class BIUGrant(Grant):
    def __init__(self):
        super().__init__(
            title="אוניברסיטת בר אילן - מענק לימודים",
            description="סטודנטיות וסטודנטים הרשומים לשנהל תשפד וגויסו לשירות מילואים, מוזמנות ומוזמנים להגיש בקשה למלגה דרך מערכת האינ-בר. המלגות בסכום של 5,000-1,000 שקלים יוענקו כזיכוי לחשבון שכל לשנהל תשפד",
            link_to_source="https://new.huji.ac.il/2-3-%D7%A7-%D7%91%D7%9C",
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return Academy.BIU == reservist.academy

    def calculate(self, reservist: ReservistProfile) -> None:
        self.other_reward = "מלגה בסכום של 5,000-1,000 שקלים"
