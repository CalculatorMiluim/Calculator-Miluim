from certificate_of_active_reservist import is_eligable as certificate_of_active_reservist_is_eligable
from models.ReservistProfile import ReservistProfile
from models.BenefitDetails import BenefitDetails

def is_eligable(reservist_details: ReservistProfile) -> bool:
    # dependent if the reservist have an active reservant certificate
    return certificate_of_active_reservist_is_eligable(reservist_details) and reservist_details.service_type == "commander"


def calculate(benefit_details: BenefitDetails, reservist_details: ReservistProfile) -> int:
    pass