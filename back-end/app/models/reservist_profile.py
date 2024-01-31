from dataclasses import dataclass
from typing import Optional, List

from app.models.consts import RecruitmentDate, CombatLevel, FamilyStatus, EmploymentStatus, BusinessSize, Academy, RecruitmentType


@dataclass
class ReservistProfile:
    recruitment_dates: List[RecruitmentDate]
    combat_level: CombatLevel
    family_status: FamilyStatus
    academy: Optional[Academy]
    employment_status: EmploymentStatus
    business_size: Optional[BusinessSize]
    is_commander: bool
    property_owner: bool
    active_reservist: bool

    def calculate_total_days(self) -> int:
        total_days = 0
        for recruit in self.recruitment_dates:
            diff = recruit.end_date - recruit.start_date
            total_days += diff.days
        return total_days

    @property
    def days_in_tzav_8(self) -> int:
        for recruit in self.recruitment_dates:
            if recruit.recruitment_type == RecruitmentType.TZAV_8:
                diff = recruit.end_date - recruit.start_date
                return diff.days
        return 0

    @property
    def has_child_under_14(self) -> bool:
        return self.family_status.children and self.family_status.children.is_under_14

    @property
    def has_child_with_special_needs(self) -> bool:
        return self.family_status.children and self.family_status.children.is_special_needs
