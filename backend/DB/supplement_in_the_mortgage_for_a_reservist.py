from six_year_active_reservist_certificate import is_eligable as six_year_active_reservist_certificate_is_eligable
from models.ReservistProfile import ReservistProfile
from models.BenefitDetails import BenefitDetails

def is_eligable(reservist_details: ReservistProfile) -> bool:
    # dependent if the reservist have an active six year active reservant certificate
    return six_year_active_reservist_certificate_is_eligable(reservist_details)


def calculate(benefit_details: BenefitDetails, reservist_details: ReservistProfile) -> int:
    pass