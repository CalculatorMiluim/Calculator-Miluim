from dataclasses import dataclass
from typing import Optional

from app.models.consts import RecruitmentDate, CombatLevel, FamilyStatus, EmploymentStatus, BusinessSize, Academy


@dataclass
class ReservistProfile:
    recruitment_dates: list[RecruitmentDate]
    combat_level: CombatLevel
    family_status: FamilyStatus
    academy: Optional[Academy]
    employment_status: EmploymentStatus
    business_size: Optional[BusinessSize]
    property_owner: bool
    active_reservist: bool

    def calculate_total_days(self):
        total_days = 0
        for recruit in self.recruitment_dates:
            diff = recruit.end_date - recruit.start_date
            total_days += diff.days
        return total_days

    def has_child_under_14(self):
        return self.family_status.children and self.family_status.children.is_under_14

    def has_child_with_special_needs(self):
        return self.family_status.children and self.family_status.children.is_special_needs
