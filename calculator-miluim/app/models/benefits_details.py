from dataclasses import dataclass
from typing import Optional
from abc import ABC, abstractmethod
from app.models.consts import BenefitType
from app.models.reservist_profile import ReservistProfile


@dataclass
class BenefitDetails(ABC):
    title: str
    description: str
    link_to_source: str
    benefit_type: BenefitType
    financial_reward: Optional[int]
    other_reward: Optional[str]

    @abstractmethod
    def is_eligible(self, reservist: ReservistProfile) -> bool:
        raise NotImplementedError

    @abstractmethod
    def calculate(self, reservist: ReservistProfile) -> None:
        raise NotImplementedError


@dataclass
class Voucher(BenefitDetails, ABC):
    title: str
    description: str
    link_to_source: str
    benefit_type: BenefitType.VOUCHER
    financial_reward: int = 0
    other_reward: Optional[str] = None


@dataclass
class Grant(BenefitDetails, ABC):
    title: str
    description: str
    link_to_source: str
    benefit_type: BenefitType.GRANT
    financial_reward: int = 0
    other_reward: Optional[str] = None


@dataclass
class AutomaticGrant(BenefitDetails, ABC):
    title: str
    description: str
    link_to_source: str
    benefit_type: BenefitType.AUTOMATIC_GRANT
    financial_reward: int = 0
    other_reward: Optional[str] = None
