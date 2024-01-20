import {IHomeChoiceFormField} from "@/pages/Home/HomeChoiceFormField/HomeChoiceFormField.tsx";


export const CHILDREN_VALUES = {
  UNDER_14: 0,
  SPECIAL_NEEDS: 1,
  OTHER: 2,
}

export const BUSINESS_VALUES = {
  SMALL: 'עסק קטן',
  MEDIUM: 'עסק בינוני',
}

export const COMBAT_LEVEL_VALUES = {
  WARRIOR: 'לוחם',
  COMBAT_SUPPORT: 'תומך_לחימה',
  SUPPORT_ROLE: 'עורפי',
}

export const EMPLOYMENT_STATUS_VALUES = {
  SELF_EMPLOYED: 'עצמאי',
  EMPLOYED: 'שכיר',
  OTHER: 'אחר',
  UNPAID_LEAVE: 'חל״ת',
  ELIGIBLE_FOR_UNEMPLOYMENT_BENEFITS: 'זכאי_לדמי_אבטלה',
}


export const HOME_OPTIONS_MAP:Record<string, Partial<IHomeChoiceFormField>>={
    isActiveReservist:{}
}