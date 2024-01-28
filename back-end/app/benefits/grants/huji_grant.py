from app.models.reservist_profile import ReservistProfile
from app.models.benefits_details import Grant
from app.models.consts import Academy, CombatLevel


class HujiGrant(Grant):
    def __init__(self):
        super().__init__(
            title="האוניברסיטה העברית - מענק לימודים",
            description="מתוך הוקרה והערכה רבה למשרתי ומשרתות המילואים, אשר הינם סטודנטים וסטודנטיות באוניברסיטה העברית, אנו גאים להעניק לכם מענק כספי מיוחד בגובה של 2,000 ₪ לפחות, ובתוספת מעטפת תמיכה אישית—אקדמית, כלכלית ורגשית בשווי של אלפי שקלים",
            link_to_source="https://new.huji.ac.il/2-3-%D7%A7-%D7%91%D7%9C",
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return Academy.HUJI == reservist.academy

    def calculate(self, reservist: ReservistProfile) -> None:
        self.financial_reward = 2000
