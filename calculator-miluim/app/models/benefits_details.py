from typing import Optional
from abc import ABC, abstractmethod
from app.models.consts import BenefitType
from app.models.reservist_profile import ReservistProfile


class BenefitDetails(ABC):
    def __init__(
            self,
            benefit_type: BenefitType,
            amount: Optional[int],
            name: str,
            title: str,
            description: str,
            link_to_source: str,
    ) -> None:
        self.benefit_type = benefit_type
        self.amount = amount
        self.name = name
        self.title = title
        self.description = description
        self.link_to_source = link_to_source

    @abstractmethod
    def is_eligible(self, reservist: ReservistProfile) -> bool:
        raise NotImplementedError

    @abstractmethod
    def calculate(self, reservist: ReservistProfile) -> None:
        raise NotImplementedError


class Voucher(BenefitDetails, ABC):
    def __init__(
            self,
            amount: Optional[int],
            name: str,
            title: str,
            description: str,
            link_to_source: str,
    ) -> None:
        super().__init__(
            benefit_type=BenefitType.VOUCHER,
            amount=amount,
            name=name,
            title=title,
            description=description,
            link_to_source=link_to_source
        )


class Grant(BenefitDetails, ABC):
    def __init__(
            self,
            amount,
            name: str,
            title: str,
            description: str,
            link_to_source: str,
    ) -> None:
        super().__init__(
            benefit_type=BenefitType.GRANT,
            amount=amount,
            name=name,
            title=title,
            description=description,
            link_to_source=link_to_source
        )


class AutomaticGrant(BenefitDetails, ABC):
    def __init__(
            self,
            amount,
            name: str,
            title: str,
            description: str,
            link_to_source: str,
    ) -> None:
        super().__init__(
            benefit_type=BenefitType.AUTOMATIC_GRANT,
            amount=amount,
            name=name,
            title=title,
            description=description,
            link_to_source=link_to_source
        )
