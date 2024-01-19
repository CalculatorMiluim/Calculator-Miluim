from dataclasses import dataclass
from typing import Optional

from app.models.consts import RecruitmentDate, CombatLevel, FamilyStatus, EmploymentStatus, BusinessSize
from util.util import calculate_amount_of_days_served


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

    def calculate_total_days(self):
        return calculate_amount_of_days_served(self)

    def has_child_under_14(self):
        return self.family_status.children and self.family_status.children.is_under_14

    def has_child_with_special_needs(self):
        return self.family_status.children and self.family_status.children.is_special_needs
