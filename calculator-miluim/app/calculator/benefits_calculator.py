from app.models.benefits_details import Voucher
from app.models.consts import BenefitType
from app.models.reservist_profile import ReservistProfile


def calculate_benefits_for_reservist(reservist: ReservistProfile):
    benefits_owned = dict()

    benefits_owned[BenefitType.VOUCHER] = calculate_vouchers(reservist)
    benefits_owned[BenefitType.GRANT] = calculate_grants(reservist)
    benefits_owned[BenefitType.AUTOMATIC_GRANT] = calculate_automatic_grants(reservist)

    return benefits_owned


def calculate_vouchers(reservist: ReservistProfile):
    vouchers_owned = list()
    for voucher_object in Voucher.__subclasses__():
        print(str(voucher_object))
        voucher = voucher_object()
        if voucher.is_eligible(reservist):
            print("inside if")
            voucher.calculate(reservist)
            vouchers_owned.append(str(voucher))
        print("outside if")
    return vouchers_owned


def calculate_grants(reservist: ReservistProfile):
    return []


def calculate_automatic_grants(reservist: ReservistProfile):
    return []

