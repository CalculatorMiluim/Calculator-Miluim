
from models.ReservistProfile import ReservistProfile
from models.BenefitDetails import BenefitDetails

def is_eligable(reservist_details: ReservistProfile) -> bool:
        if reservist_details.years_before_release >= 3:
            total_service_days = sum(reservist_details.service_days_per_year)
            if total_service_days >= 20:
                return True
            else:
                return False
        else:
            for i in range(len(reservist_details.service_days_per_year) - 1):
                if reservist_details.service_days_per_year[i] + reservist_details.service_days_per_year[i+1] >= 14:
                    return True
            return False


def calculate(benefit_details: BenefitDetails, reservist_details: ReservistProfile) -> int:
    pass