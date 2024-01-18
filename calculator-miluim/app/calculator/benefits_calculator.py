from app.models.benefits_details import Voucher
from app.models.consts import BenefitType
from app.models.reservist_profile import ReservistProfile

# noinspection PyUnresolvedReferences
from app.benefits.vacation import Vacation


def calculate_benefits_for_reservist(reservist: ReservistProfile):
    benefits_owned = dict()

    benefits_owned[BenefitType.VOUCHER] = calculate_vouchers(reservist)
    benefits_owned[BenefitType.GRANT] = calculate_grants(reservist)
    benefits_owned[BenefitType.AUTOMATIC_GRANT] = calculate_automatic_grants(reservist)

    return benefits_owned


def calculate_vouchers(reservist: ReservistProfile):
    vouchers_owned = list()

    # if new subclassed are added, make sure also the import of the subclass is added
    for voucher_object in Voucher.__subclasses__():
        voucher = voucher_object()
        if voucher.is_eligible(reservist):
            voucher.calculate(reservist)
            vouchers_owned.append(voucher.__dict__)
    return vouchers_owned


def calculate_grants(reservist: ReservistProfile):
    return []


def calculate_automatic_grants(reservist: ReservistProfile):
    return []

