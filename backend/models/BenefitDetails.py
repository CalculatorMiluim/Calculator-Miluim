from dataclasses import dataclass
from typing import Optional

from backend.models.Consts import BenefitType


@dataclass
class BenefitDetails:
    name: str
    title: str
    description: str
    benefit_type: BenefitType
    link_to_source: str
    amount: Optional[int]


@dataclass
class Voucher(BenefitDetails):
    benefit_type = BenefitType.VOUCHER


@dataclass
class Grant(BenefitDetails):
    benefit_type = BenefitType.GRANT


@dataclass
class AutomaticGrant(BenefitDetails):
    benefit_type = BenefitType.AUTOMATIC_GRANT

