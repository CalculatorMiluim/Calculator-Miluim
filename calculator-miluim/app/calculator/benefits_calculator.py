from app.models.benefits_details import Voucher, Grant, AutomaticGrant
from app.models.consts import BenefitType
from app.models.reservist_profile import ReservistProfile

# noinspection PyUnresolvedReferences
from app.benefits.vouchers.vacation import Vacation
# noinspection PyUnresolvedReferences
from app.benefits.vouchers.couples_therapy import CouplesTherapy
# noinspection PyUnresolvedReferences
from app.benefits.automatic_grants.home_economics_grant import HomeEconomicsGrant
# noinspection PyUnresolvedReferences
from app.benefits.automatic_grants.special_family_grant import SpecialFamilyGrant
# noinspection PyUnresolvedReferences
from app.benefits.automatic_grants.increased_family_grant import IncreasedFamilyGrant


def calculate_benefits_for_reservist(reservist: ReservistProfile):
    benefits_owned = dict()

    benefits_owned[BenefitType.VOUCHER] = calculate_vouchers(reservist)
    benefits_owned[BenefitType.GRANT] = calculate_grants(reservist)
    benefits_owned[BenefitType.AUTOMATIC_GRANT] = calculate_automatic_grants(reservist)

    return benefits_owned


def calculate_vouchers(reservist: ReservistProfile):
    vouchers_owned = list()

    for voucher_object in Voucher.__subclasses__():
        print(voucher_object)
        voucher = voucher_object()
        if voucher.is_eligible(reservist):
            voucher.calculate(reservist)
            vouchers_owned.append(voucher.__dict__)

    vouchers_sum = sum(voucher.amount for voucher in vouchers_owned)
    return vouchers_sum, vouchers_owned


def calculate_grants(reservist: ReservistProfile):
    grants_owned = list()

    for grant_object in Grant.__subclasses__():
        print(grant_object)
        grant = grant_object()
        if grant.is_eligible(reservist):
            grant.calculate(reservist)
            grants_owned.append(grant.__dict__)

    grants_sum = sum(grant.amount for grant in grants_owned)
    return grants_sum, grants_owned


def calculate_automatic_grants(reservist: ReservistProfile):
    automatic_grants_owned = list()

    for automatic_grant_object in AutomaticGrant.__subclasses__():
        print(automatic_grant_object)
        automatic_grant = automatic_grant_object()
        if automatic_grant.is_eligible(reservist):
            automatic_grant.calculate(reservist)
            automatic_grants_owned.append(automatic_grant.__dict__)

    automatic_grants_sum = sum(automatic_grant.amount for automatic_grant in automatic_grants_owned)
    return automatic_grants_sum, automatic_grants_owned

