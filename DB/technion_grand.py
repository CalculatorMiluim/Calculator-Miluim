def is_eligable(reservist_details: ReservistProfile) -> bool:
    if reservist_details.study_in == 'technion' and reservist_details.reserv_da_in_war >=15:
        return True
    return False


def calculate(benefit_details: BenefitDetails, reservist_details: ReservistProfile) -> int:
    if reservist_details.reserv_da_in_war >= 30:
        return 6000
    if reservist_details.reserv_da_in_war >=15 and reservist_details.reserv_da_in_war <30:
        return 3000