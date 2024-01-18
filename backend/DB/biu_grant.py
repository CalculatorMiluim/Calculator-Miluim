from models.ReservistProfile import ReservistProfile

def is_eligable(reservist_details: ReservistProfile) -> bool:
    if reservist_details.study_in == "אונ' בר אילן"  and reservist_details.recruitment_type == "צו 8":
        return True
    return False