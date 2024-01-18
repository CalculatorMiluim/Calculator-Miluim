from dataclasses import dataclass
from typing import Optional

from app.models.consts import RecruitmentDate, CombatLevel, FamilyStatus, EmploymentStatus, BusinessSize


@dataclass
class ReservistProfile:
    recruitment_dates: list[RecruitmentDate]
    combat_level: CombatLevel
    family_status: FamilyStatus
    student: Optional[str]
    employment_status: EmploymentStatus
    business_size: Optional[BusinessSize]
    property_owner: bool
    active_reservist: bool

    @staticmethod
    def calculate_total_days():
        return 70

