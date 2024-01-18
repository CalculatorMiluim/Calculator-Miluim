from models.ReservistProfile import ReservistProfile
from models.BenefitDetails import BenefitDetails

def is_eligable(reservist_details: ReservistProfile) -> bool:
    if (reservist_details.study_in == "אונ' תל אביב" and reservist_details.reserv_da_in_war >0):
        return True
    return False


def calculate(benefit_details: BenefitDetails, reservist_details: ReservistProfile) -> int:
    
    grand = benefit_details.base_amount 
    if (benefit_details.combat_level == "לוחם"):
        grand += 1000
    
    return grand