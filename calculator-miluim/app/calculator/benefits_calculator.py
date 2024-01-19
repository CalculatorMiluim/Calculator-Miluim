from app.models.benefits_details import Voucher, Grant, AutomaticGrant
from app.models.consts import BenefitType
from app.models.reservist_profile import ReservistProfile

# noinspection PyUnresolvedReferences
from app.benefits.vouchers.couples_therapy import Vacation


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

    vouchers_sum = sum(voucher.amount for voucher in vouchers_owned)
    return vouchers_sum, vouchers_owned


def calculate_grants(reservist: ReservistProfile):
    grants_owned = list()

    # if new subclassed are added, make sure also the import of the subclass is added
    for grant_object in Grant.__subclasses__():
        grant = grant_object()
        if grant.is_eligible(reservist):
            grant.calculate(reservist)
            grants_owned.append(grant.__dict__)

    grants_sum = sum(grant.amount for grant in grants_owned)
    return grants_sum, grants_owned


def calculate_automatic_grants(reservist: ReservistProfile):
    automatic_grants_owned = list()

    # if new subclassed are added, make sure also the import of the subclass is added
    for automatic_grant_object in AutomaticGrant.__subclasses__():
        automatic_grant = automatic_grant_object()
        if automatic_grant.is_eligible(reservist):
            automatic_grant.calculate(reservist)
            automatic_grants_owned.append(automatic_grant.__dict__)

    automatic_grants_sum = sum(automatic_grant.amount for automatic_grant in automatic_grants_owned)
    return automatic_grants_sum, automatic_grants_owned

