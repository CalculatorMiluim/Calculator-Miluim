from dataclasses import dataclass
from typing import Optional
from abc import ABC, abstractmethod
from app.models.consts import BenefitType
from app.models.reservist_profile import ReservistProfile


@dataclass
class BenefitDetails(ABC):
    benefit_type: BenefitType
    financial_reward: Optional[int]
    other_reward: Optional[str]
    title: str
    description: str
    link_to_source: str

    @abstractmethod
    def is_eligible(self, reservist: ReservistProfile) -> bool:
        raise NotImplementedError

    @abstractmethod
    def calculate(self, reservist: ReservistProfile) -> None:
        raise NotImplementedError


@dataclass
class Voucher(BenefitDetails, ABC):
    benefit_type: BenefitType.VOUCHER
    financial_reward: int = 0
    other_reward: Optional[str] = None
    title: str
    description: str
    link_to_source: str


@dataclass
class Grant(BenefitDetails, ABC):
    benefit_type: BenefitType.GRANT
    financial_reward: int = 0
    other_reward: Optional[str] = None
    title: str
    description: str
    link_to_source: str


@dataclass
class AutomaticGrant(BenefitDetails, ABC):
    benefit_type: BenefitType.AUTOMATIC_GRANT
    financial_reward: int = 0
    other_reward: Optional[str] = None
    title: str
    description: str
    link_to_source: str
