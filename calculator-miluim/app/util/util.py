from models.reservist_profile import ReservistProfile


def calculate_amount_of_days_served(reservist: ReservistProfile):
    total_days = 0
    for recruit in reservist.recruitment_dates:
        diff = recruit.end_date - recruit.start_date
        total_days += diff.days
    return total_days
