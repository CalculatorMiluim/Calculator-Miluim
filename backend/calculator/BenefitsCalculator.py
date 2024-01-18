from backend.models.BenefitDetails import BenefitDetails, Voucher
from backend.models.Consts import BenefitType
from backend.models.ReservistProfile import ReservistProfile


def calculate_benefits_for_reservist(reservist: ReservistProfile, benefits: list[BenefitDetails]):
    benefits_owned = dict()

    benefits_owned[BenefitType.VOUCHER](calculate_vouchers(reservist))
    benefits_owned[BenefitType.GRANT](calculate_grants(reservist))
    benefits_owned[BenefitType.AUTOMATIC_GRANT](calculate_automatic_grants(reservist))

    return benefits_owned


def calculate_vouchers(reservist: ReservistProfile):
    vouchers_owned = list()
    for subclass in Voucher.__subclasses__():
        if benefit.is_eligible():
            benefit.calculate()
            benefits_owned.append(benefit)


def calculate_grants(reservist: ReservistProfile):
    ...


def calculate_automatic_grants(reservist: ReservistProfile):
    ...