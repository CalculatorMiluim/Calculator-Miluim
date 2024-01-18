from models.ReservistProfile import ReservistProfile
from models.BenefitDetails import BenefitDetails

def is_eligable(reservist_details: ReservistProfile) -> bool:
    if reservist_details.study_in == "אונ' העברית" and reservist_details.reserv_da_in_war >0 and reservist_details.recruitment_type == "צו 8" and reservist_details.combat_level == "לוחם":
        return True
    if reservist_details.study_in == "אונ' העברית" and reservist_details.reserv_da_in_war >=10 and reservist_details.recruitment_type == "צו 8":
        return True
    return False

def calculate(benefit_details: BenefitDetails, reservist_details: ReservistProfile) -> int:
    return benefit_details.base_amount