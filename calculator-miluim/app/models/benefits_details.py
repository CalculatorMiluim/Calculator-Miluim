from dataclasses import dataclass
from typing import Optional
from abc import ABC, abstractmethod
from backend.models.consts import BenefitType
from backend.models.reservist_profile import ReservistProfile


@dataclass
class BenefitDetails(ABC):
    name: str
    title: str
    description: str
    benefit_type: BenefitType
    link_to_source: str
    amount: Optional[int]

    @abstractmethod
    def is_eligible(self, reservist: ReservistProfile) -> bool:
        raise NotImplementedError

    @abstractmethod
    def calculate(self, reservist: ReservistProfile) -> None:
        raise NotImplementedError


@dataclass
class Voucher(BenefitDetails, ABC):
    benefit_type = BenefitType.VOUCHER


@dataclass
class Grant(BenefitDetails, ABC):
    benefit_type = BenefitType.GRANT


@dataclass
class AutomaticGrant(BenefitDetails, ABC):
    benefit_type = BenefitType.AUTOMATIC_GRANT

