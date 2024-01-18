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
