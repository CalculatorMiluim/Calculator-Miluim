from dataclasses import dataclass
from typing import Optional

from backend.models.Consts import RecruitmentDate, CombatLevel, FamilyStatus, EmploymentStatus, BusinessSize


@dataclass
class ReservistProfile:
    recruitment_dates: list[RecruitmentDate]
    combat_level: CombatLevel
    family_status: FamilyStatus
    student: Optional[str]
    employment_status: EmploymentStatus
    business_size: BusinessSize
    property_owner: bool
    active_reservist: bool





