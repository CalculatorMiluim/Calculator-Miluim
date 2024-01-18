from models.ReservistProfile import ReservistProfile
from models.BenefitDetails import BenefitDetails

def is_eligable(reservist_details: ReservistProfile) -> bool:
    if reservist_details.active_years >= 6:
        return True
    else:
        return False


def calculate(benefit_details: BenefitDetails, reservist_details: ReservistProfile) -> int:
    pass