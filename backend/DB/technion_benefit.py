from models.ReservistProfile import ReservistProfile

def is_eligable(reservist_details: ReservistProfile) -> bool:
    if reservist_details.study_in == 'טכניון':
        return True
    return False
  