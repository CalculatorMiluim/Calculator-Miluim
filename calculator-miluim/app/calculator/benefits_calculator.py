from app.models.benefits_details import Voucher, Grant, AutomaticGrant
from app.models.consts import BenefitType, AMOUNT, BENEFITS, FINANCIAL_REWARD, TOTAL_AMOUNT
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
    from app.benefits.automatic_grants.additional_benefit import AdditionalBenefit
    from app.benefits.automatic_grants.family_with_child_under_14 import FamilyWithChildUnder14
    from app.benefits.automatic_grants.increased_personal_expenses_grant import IncreasedPersonalExpensesGrant
    from app.benefits.automatic_grants.personal_expenses_grant import PersonalExpensesGrant
    from app.benefits.automatic_grants.special_benefit import SpecialBenefitp


def calculate_benefits_for_reservist(reservist: ReservistProfile):
    import_all_grants()
    benefits_owned = dict()

    benefits_owned[BenefitType.VOUCHER] = calculate_vouchers(reservist)
    benefits_owned[BenefitType.GRANT] = calculate_grants(reservist)
    benefits_owned[BenefitType.AUTOMATIC_GRANT] = calculate_automatic_grants(reservist)

    benefits_owned[TOTAL_AMOUNT] = (benefits_owned[BenefitType.VOUCHER][AMOUNT] +
                                    benefits_owned[BenefitType.GRANT][AMOUNT] +
                                    benefits_owned[BenefitType.AUTOMATIC_GRANT][AMOUNT])

    return benefits_owned


def calculate_vouchers(reservist: ReservistProfile):
    vouchers_owned = list()

    for voucher_object in Voucher.__subclasses__():
        voucher = voucher_object()
        if voucher.is_eligible(reservist):
            voucher.calculate(reservist)
            vouchers_owned.append(voucher.__dict__)

    vouchers_sum = sum(voucher[FINANCIAL_REWARD] for voucher in vouchers_owned)
    return {AMOUNT: vouchers_sum, BENEFITS: vouchers_owned}


def calculate_grants(reservist: ReservistProfile):
    grants_owned = list()

    for grant_object in Grant.__subclasses__():
        grant = grant_object()
        if grant.is_eligible(reservist):
            grant.calculate(reservist)
            grants_owned.append(grant.__dict__)

    grants_sum = sum(grant[FINANCIAL_REWARD] for grant in grants_owned)
    return {AMOUNT: grants_sum, BENEFITS: grants_owned}


def calculate_automatic_grants(reservist: ReservistProfile):
    automatic_grants_owned = list()

    for automatic_grant_object in AutomaticGrant.__subclasses__():
        automatic_grant = automatic_grant_object()
        if automatic_grant.is_eligible(reservist):
            automatic_grant.calculate(reservist)
            automatic_grants_owned.append(automatic_grant.__dict__)

    automatic_grants_sum = sum(automatic_grant[FINANCIAL_REWARD] for automatic_grant in automatic_grants_owned)
    return {AMOUNT: automatic_grants_sum, BENEFITS: automatic_grants_owned}

