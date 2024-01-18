from enum import Enum

from backend.models.Consts import CombatLevel, RecruitmentType
from backend.models.ReservistProfile import ReservistProfile


class CalculationType(Enum):
    TOTAL = 'total',
    DAILY = 'daily',
    TEN_DAY = 'ten_day'


class GrantBase(object):

    def __init__(self):
        self.name = ''
        self.grants = None
        self.conditions = self.add_conditions()
        self.sum = 0
        self.calculation_type = CalculationType.TOTAL

    class Condition(object):
        def __init__(self):
            self.min_active_reserve_days = 0
            self.max_active_reserve_days = 0
            self.combat_level = CombatLevel.COMBAT_UNIT
            self.recruitment_type = RecruitmentType.OTHER

    def is_eligeble(self, reservist = ReservistProfile):
        pass

    def add_sub_grants(self):
        pass

    def add_conditions(self):
        return None

    def eligible_according_to_dates(self, reservist):
        total_days = calculate_reserve_duty_days(reservist.recruitment_dates)
        eligible = False
        if self.conditions.min_active_reserve_days <= total_days:
            if self.conditions.max_active_reserve_days:
                if self.conditions.max_active_reserve_days >= total_days:
                    eligible = True
            else:
                eligible = True
        return eligible

    def calculate(self, reservist):
        total_grant = 0
        total_days = calculate_reserve_duty_days(reservist.recruitment_dates)
        if self.calculation_type == CalculationType.TOTAL:
            print("grant type is total")
            total_grant = self.sum
        elif self.calculation_type == CalculationType.DAILY:
            print(f"grant type is daily. calculating grant(%s)*days(%s)" % (self.sum, total_days))
            total_grant = self.sum * total_days
        elif self.calculation_type == CalculationType.TEN_DAY:
            iteration = total_days // 10
            total_grant = iteration * self.sum
        return total_grant


def calculate_reserve_duty_days(recruitment_dates):
    total_days = 0
    for recruitment_date in recruitment_dates:
        total_days += (recruitment_date.end_date - recruitment_date.start_date).days
    return total_days



class ExpansesGrant(GrantBase):

    def __init__(self):
        super().__init__()
        self.name = 'expenses'

    def add_sub_grants(self):
        self.grants = [BasicExpansesGrant(),StageAExpansesGrant(),StageAExpansesGrant(),StageCExpansesGrant(),StageDExpansesGrant()]


class BasicExpansesGrant(GrantBase):
    def __init__(self):
        super().__init__()
        self.name = 'Basic expenses'
        self.sum = 266

    def add_conditions(self):
        condition = self.Condition()
        condition.min_active_reserve_days = 5
        condition.max_active_reserve_days = 9.5
        return condition

    def is_eligeble(self, reservist = ReservistProfile):
        return self.eligible_according_to_dates(reservist)



class StageAExpansesGrant(GrantBase):
    def __init__(self):
        super().__init__()
        self.name = 'Stage A expenses'
        self.sum = 1410

    def add_conditions(self):
        condition = self.Condition()
        condition.min_active_reserve_days = 10
        condition.max_active_reserve_days = 14.5
        return condition

    def is_eligeble(self, reservist = ReservistProfile):
        return self.eligible_according_to_dates(reservist)

class StageBExpansesGrant(GrantBase):
    def __init__(self):
        super().__init__()
        self.name = 'Stage B expenses'
        self.sum = 2820

    def add_conditions(self):
        condition = self.Condition()
        condition.min_active_reserve_days = 15
        condition.max_active_reserve_days = 19.5
        return condition

    def is_eligeble(self, reservist = ReservistProfile):
        return self.eligible_according_to_dates(reservist)

class StageCExpansesGrant(GrantBase):
    def __init__(self):
        super().__init__()
        self.name = 'Stage C expenses'
        self.sum = 4230

    def add_conditions(self):
        condition = self.Condition()
        condition.min_active_reserve_days = 20
        condition.max_active_reserve_days = 36.5
        return condition

    def is_eligeble(self, reservist = ReservistProfile):
        return self.eligible_according_to_dates(reservist)

class StageDExpansesGrant(GrantBase):
    def __init__(self):
        super().__init__()
        self.name = 'Stage D expenses'
        self.sum = 5640

    def add_conditions(self):
        condition = self.Condition()
        condition.min_active_reserve_days = 37
        condition.max_active_reserve_days = None
        return condition

    def is_eligeble(self, reservist = ReservistProfile):
        return self.eligible_according_to_dates(reservist)


class SpecialGrant(GrantBase):
    def __init__(self):
        super().__init__()
        self.name = "תגמול מיוחד"
        self.calculation_type = CalculationType.DAILY
        self.sum =133

    def add_conditions(self):
        condition = self.Condition()
        condition.min_active_reserve_days = 32
        condition.max_active_reserve_days = None
        return condition

    def is_eligeble(self, reservist = ReservistProfile):
        return self.eligible_according_to_dates(reservist)

class IncreasedExpanseBase(GrantBase):
    def __init__(self):
        super().__init__()
        self.calculation_type = CalculationType.TEN_DAY

    def add_conditions(self):
        condition = self.Condition()
        condition.min_active_reserve_days = 30
        condition.max_active_reserve_days = None
        condition.recruitment_type = RecruitmentType.TAASUKA_MIVTZAIT
        return condition

    def is_eligeble(self, reservist = ReservistProfile):
        if self.eligible_according_to_dates(reservist):
            pass
            #calculate if there are enough dates with RecruitmentType.TAASUKA_MIVTZAIT type

class IncreasedExpansesNoneCombat(IncreasedExpanseBase):
    def __init__(self):
        super().__init__()
        self.name = "מענק הוצאות אישיות מוגדל ללא לוחם"
        self.sum = 266

    def add_conditions(self):
        condition = super().add_conditions()
        condition.combat_level = CombatLevel.NON_COMBAT_UNIT
        return condition


class IncreasedExpansesCombat(IncreasedExpanseBase):
    def __init__(self):
        super().__init__()
        self.name = "מענק הוצאות אישיות מוגדל ללוחם"
        self.sum = 466

    def add_conditions(self):
        condition = super().add_conditions()
        condition.combat_level = CombatLevel.COMBAT_UNIT
        return condition


def init_grants():
    return [ExpansesGrant(),SpecialGrant(),IncreasedExpansesNoneCombat(),IncreasedExpansesCombat()]


#maybe irrelevant
class GrantCalculator(object):
    def __init__(self):
        self.grants = init_grants()

    def calculate_grants(self, reservist):
        total_grants = 0
        if reservist and self.grants:
            for grant in self.grants:
                total_grants += self.calculate_grant(grant,reservist)

        else:
            print("Error")
        return total_grants

    def calculate_grant(self, grant, reservist):

        print(f"========\nCalculating grant: %s for the reservist" % grant.name)
        if grant.conditions:
            if grant.is_elegible(reservist):
                return self.sum_grant(grant.sum, grant.calculation_type,
                                      reservist.calculate_total_active_reserve_days())
            else:
                print("reservist is not alegible for this grant")
                return 0
        else:
            if grant.grants:
                print("#####dealing with sub grants")
                total_sub_grant = 0
                for sub_grant in grant.grants:
                    total_sub_grant += self.calculate_grant(sub_grant, reservist)
                return total_sub_grant
            return 0

    def sum_grant(self, grant, grant_type, total_days):
        total_grant = 0
        if grant_type == CalculationType.TOTAL:
            print("grant type is total")
            total_grant = grant
        elif grant_type == CalculationType.DAILY:
            print(f"grant type is daily. calculating grant(%s)*days(%s)" % (grant, total_days))
            total_grant = grant * total_days
        elif grant_type == CalculationType.TEN_DAY:
            pass #TODO Calculate for Maanak Lechima

        print(f"The reservist will get total of %s from this grant" % total_grant)
        return total_grant