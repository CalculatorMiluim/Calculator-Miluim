from app.models.benefits_details import Voucher, Grant, AutomaticGrant
from app.models.consts import BenefitType
from app.models.reservist_profile import ReservistProfile


def import_all_grants():
    from app.benefits.vouchers.vacation_voucher import VacationVoucher
    from app.benefits.vouchers.couples_therapy_voucher import CouplesTherapyVoucher

    from app.benefits.grants.technion_grant import TechnionUniversityGrant
    from app.benefits.grants.tau_grant import TauGrant
    from app.benefits.grants.bgu_grant import BGUGrant

    from app.benefits.automatic_grants.home_economics_grant import HomeEconomicsGrant
    from app.benefits.automatic_grants.special_family_grant import SpecialFamilyGrant
    from app.benefits.automatic_grants.increased_family_grant import IncreasedFamilyGrant
    from app.benefits.automatic_grants.arrangement_days_grant import ArrangementDaysGrant


def calculate_benefits_for_reservist(reservist: ReservistProfile):
    import_all_grants()
    benefits_owned = dict()

    benefits_owned[BenefitType.VOUCHER] = calculate_vouchers(reservist)
    benefits_owned[BenefitType.GRANT] = calculate_grants(reservist)
    benefits_owned[BenefitType.AUTOMATIC_GRANT] = calculate_automatic_grants(reservist)

    return benefits_owned


def calculate_vouchers(reservist: ReservistProfile):
    vouchers_owned = list()

    for voucher_object in Voucher.__subclasses__():
        voucher = voucher_object()
        if voucher.is_eligible(reservist):
            voucher.calculate(reservist)
            vouchers_owned.append(voucher.__dict__)

    vouchers_sum = sum(voucher['financial_reward'] for voucher in vouchers_owned)
    return vouchers_sum, vouchers_owned


def calculate_grants(reservist: ReservistProfile):
    grants_owned = list()

    for grant_object in Grant.__subclasses__():
        grant = grant_object()
        if grant.is_eligible(reservist):
            grant.calculate(reservist)
            grants_owned.append(grant.__dict__)

    grants_sum = sum(grant['financial_reward'] for grant in grants_owned)
    return grants_sum, grants_owned


def calculate_automatic_grants(reservist: ReservistProfile):
    automatic_grants_owned = list()

    for automatic_grant_object in AutomaticGrant.__subclasses__():
        automatic_grant = automatic_grant_object()
        if automatic_grant.is_eligible(reservist):
            automatic_grant.calculate(reservist)
            automatic_grants_owned.append(automatic_grant.__dict__)

    automatic_grants_sum = sum(automatic_grant['financial_reward'] for automatic_grant in automatic_grants_owned)
    return automatic_grants_sum, automatic_grants_owned

