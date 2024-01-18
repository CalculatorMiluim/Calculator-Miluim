from backend.models.benefits_details import BenefitDetails, Voucher
from backend.models.consts import BenefitType
from backend.models.reservist_profile import ReservistProfile


def calculate_benefits_for_reservist(reservist: ReservistProfile):
    benefits_owned = dict()

    benefits_owned[BenefitType.VOUCHER](calculate_vouchers(reservist))
    benefits_owned[BenefitType.GRANT](calculate_grants(reservist))
    benefits_owned[BenefitType.AUTOMATIC_GRANT](calculate_automatic_grants(reservist))

    return benefits_owned


def calculate_vouchers(reservist: ReservistProfile):
    vouchers_owned = list()
    for voucher_object in Voucher.__subclasses__():
        voucher = voucher_object()
        if voucher.is_eligible(reservist):
            voucher.calculate(reservist)
            vouchers_owned.append(str(voucher))
    return vouchers_owned


def calculate_grants(reservist: ReservistProfile):
    return []


def calculate_automatic_grants(reservist: ReservistProfile):
    return []

