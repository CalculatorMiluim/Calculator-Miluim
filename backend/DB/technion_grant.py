from models.ReservistProfile import ReservistProfile
from models.BenefitDetails import BenefitDetails

def is_eligable(reservist_details: ReservistProfile) -> bool:
    if reservist_details.study_in == 'טכניון' and reservist_details.reserv_da_in_war >=15 and reservist_details.recruitment_type == "צו 8":
        return True
    return False


def calculate(benefit_details: BenefitDetails, reservist_details: ReservistProfile) -> int:
    if reservist_details.reserv_da_in_war >= 30:
        return benefit_details.base_amount*2
    if reservist_details.reserv_da_in_war >=15 and reservist_details.reserv_da_in_war <30:
        return benefit_details.base_amount