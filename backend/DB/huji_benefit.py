from models.ReservistProfile import ReservistProfile
from models.BenefitDetails import BenefitDetails

def is_eligable(reservist_details: ReservistProfile) -> bool:
    if reservist_details.study_in == "אונ' העברית"  and reservist_details.recruitment_type == "צו 8":
        return True
    return False


