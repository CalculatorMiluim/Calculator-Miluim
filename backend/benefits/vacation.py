

def is_eligible(reservist_profile) -> bool:
    return reservist_profile.days_in_war >= 60


def calculate(reservist_profile, benefit_details) -> int:
    if reservist_profile.is_combat_unit and reservist_profile.has_kid_under_14:
        return 4500

    if reservist_profile.is_combat_unit:
        return 3500

    if reservist_profile.has_kid_under_14:
        return 2000

    return 1500