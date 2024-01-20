from app.models.reservist_profile import ReservistProfile
from app.models.benefits_details import Grant
from app.models.consts import Academy, CombatLevel


class TauGrant(Grant):
    def __init__(self):
        super().__init__(
            title="אוניברסיטת תל אביב - מענק לימודים",
            description="סיוע מיוחד לסטודנטים וסטודנטיות שגוייסו למילואים",
            link_to_source="https://www.tau.ac.il/news/ironswords-miluim",
            financial_reward=0,
        )

    def is_eligible(self, reservist: ReservistProfile) -> bool:
        return Academy.TAU == reservist.academy

    def calculate(self, reservist: ReservistProfile) -> None:
        if reservist.combat_level == CombatLevel.COMBAT_UNIT:
            self.financial_reward = 3000
        else:
            self.financial_reward = 2000
