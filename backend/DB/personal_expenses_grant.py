from certificate_of_active_reservist import is_eligable as certificate_of_active_reservist_is_eligable
from models.ReservistProfile import ReservistProfile
from models.BenefitDetails import BenefitDetails

def is_eligable(reservist_details: ReservistProfile) -> bool:
    for recruitment in reservist_details.recruitment_date:
        if recruitment.recruitment_type == "צו-8":
            service_days = (recruitment.end_date - recruitment.start_date).days
            if service_days >= 8:
                return True
    return False

def calculate(benefit_details: BenefitDetails, reservist_details: ReservistProfile) -> int:
    return benefit_details.base_amount