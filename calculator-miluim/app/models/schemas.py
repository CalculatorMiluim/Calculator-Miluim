from pydantic import BaseModel

from dataclasses import dataclass
from datetime import date
from enum import Enum
from typing import Optional


class RecruitmentType(Enum):
    TZAV_8 = "צו 8"
    TAASUKA_MIVTZAIT = "תעסוקה מבצעית"
    OTHER = "אחר"


class CombatLevel(Enum):
    COMBAT_UNIT = "לוחם"
    NON_COMBAT_UNIT = "תומך לחימה "


class EmploymentStatus(Enum):
    UNEMPLOYMENT = "זכאי לדמי אבטלה"
    EMPLOYEE = "שכיר"
    INDEPENDENT = "עצמאי"
    UNPAID_VACATION = "חל״ת"
    OTHER = "אחר"


class BusinessSize(Enum):
    SMALL_BUSINESS = "עסק קטן"
    MEDIUM_BUSINESS = "עסק בינוני"


class RecruitmentDate(BaseModel):
    start_date: date
    end_date: date
    recruitment_type: RecruitmentType


class Partner(BaseModel):
    employment_status: Optional[str]


class Children(BaseModel):
    is_under_14: bool
    is_special_needs: bool


class FamilyStatus(BaseModel):
    partner: Partner
    children: Children


class BenefitType(BaseModel):
    VOUCHER = 0
    GRANT = 1
    AUTOMATIC_GRANT = 2


class ReservistProfile(BaseModel):
    recruitment_dates: list[RecruitmentDate]
    combat_level: CombatLevel
    family_status: FamilyStatus
    student: Optional[str]
    employment_status: EmploymentStatus
    business_size: BusinessSize
    property_owner: bool
    active_reservist: bool
