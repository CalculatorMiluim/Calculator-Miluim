import { IHomeChoiceFormField } from '@/pages/Home/HomeChoiceFormField/HomeChoiceFormField.tsx'

export const CHILDREN_VALUES = {
  UNDER_14: 'ילד עם גיל 14',
  SPECIAL_NEEDS: 'ילד עם צרכים מיוחדים והוא תלמיד (עד גיל 21)',
  OTHER: 'אחר',
}

const BUSINESS_VALUES = {
  SMALL: 'עסק קטן',
  MEDIUM: 'עסק בינוני',
}

const COMBAT_LEVEL_VALUES = {
  WARRIOR: 'לוחם',
  COMBAT_SUPPORT: 'תומך_לחימה',
  SUPPORT_ROLE: 'עורפי',
}

const EMPLOYMENT_STATUS_VALUES = {
  SELF_EMPLOYED: 'עצמאי',
  EMPLOYED: 'שכיר',
  OTHER: 'אחר',
  UNPAID_LEAVE: 'חל״ת',
  ELIGIBLE_FOR_UNEMPLOYMENT_BENEFITS: 'זכאי_לדמי_אבטלה',
}

export const ACADEMIC_INSTITUTION_VALUES = {
  TECHNION: 'טכניון',
  TLV: 'אונ’ תל אביב',
  BG: 'אונ’ בן גוריון',
}

export const HOME_OPTIONS_MAP: Record<string, Partial<IHomeChoiceFormField>> = {
  isActiveReservist: {
    label: 'האם בשירות מילואים פעיל?',
    options: [
      { label: 'כן', value: true, endIcon: '✅️' },
      { label: 'לא', value: false, endIcon: '❌' },
    ],
    subDescription: `משרת מילואים פעיל הוא מי ששירת לפחות 20 ימי שמ"פ במהלך 3 שנים (או 14 ימים במהלך שנה או שנתיים צמודות למי
          שטרם מלאו 3 שנים לשחרורם)`,
  },
  isCommander: {
    label: 'האם מפקד/ת?',
    options: [
      { label: 'כן', value: true, endIcon: '✅️' },
      { label: 'לא', value: false, endIcon: '❌' },
    ],
  },
  serviceType: {
    label: 'סוג שירות צבאי?',
    options: [
      { label: 'יחידה קרבית', value: COMBAT_LEVEL_VALUES.WARRIOR, endIcon: '⚔️' },
      { label: 'יחידה עורפית', value: COMBAT_LEVEL_VALUES.COMBAT_SUPPORT, endIcon: '🛠️️' },
    ],
  },
  familyStatus: {
    label: 'מצב משפחתי?',
    options: [
      { label: 'אין לי בן/בת זוג', value: 0 },
      { label: 'יש לי בן/בת זוג', value: 1 },
    ],
  },
  partner: {
    isFollowUpQuestion: true,
    multiSelect: true,
    label: 'אז לגבי בן/בת הזוג שלך...',
    options: [
      {
        label: 'הם זכאים לדמי אבטלה',
        value: EMPLOYMENT_STATUS_VALUES.ELIGIBLE_FOR_UNEMPLOYMENT_BENEFITS,
      },
      { label: 'הם שכירים', value: EMPLOYMENT_STATUS_VALUES.EMPLOYED },
      { label: 'הם עצמאים', value: EMPLOYMENT_STATUS_VALUES.SELF_EMPLOYED },
      { label: 'הם בחל"ת', value: EMPLOYMENT_STATUS_VALUES.UNPAID_LEAVE },
      { label: 'אחר', value: EMPLOYMENT_STATUS_VALUES.OTHER },
    ],
  },
  isParent: {
    label: 'מצב משפחתי?',
    options: [
      { label: 'אין לי ילדים', value: false, endIcon: '👻' },
      { label: 'הורה לילד', value: true, endIcon: '👼' },
    ],
  },
  childrenStatus: {
    multiSelect: true,
    isFollowUpQuestion: true,
    label: 'אז לגבי הילדים...',
    options: [
      { label: 'יש לי ילד עד גיל 14', value: CHILDREN_VALUES.UNDER_14 },
      { label: 'יש לי ילד עם צרכים מיוחדים', value: CHILDREN_VALUES.SPECIAL_NEEDS },
      { label: 'אף אחת מהאופציות', value: CHILDREN_VALUES.OTHER },
    ],
  },
  employmentStatus: {
    label: 'מה מצבך התעסוקתי?',
    options: [
      { label: 'אני עצמאי/ת', value: EMPLOYMENT_STATUS_VALUES.SELF_EMPLOYED },
      { label: 'אני שכיר/ה', value: EMPLOYMENT_STATUS_VALUES.EMPLOYED },
      {
        label: 'זכאי/ת לדמי אבטלה',
        value: EMPLOYMENT_STATUS_VALUES.ELIGIBLE_FOR_UNEMPLOYMENT_BENEFITS,
      },
      { label: 'אני בחל"ת', value: EMPLOYMENT_STATUS_VALUES.UNPAID_LEAVE },
      { label: 'אחר', value: EMPLOYMENT_STATUS_VALUES.OTHER },
    ],
  },
  businessStatus: {
    columns: true,
    isFollowUpQuestion: true,
    multiSelect: true,
    label: 'לגבי העסק שלך...',
    options: [
      {
        label: 'עסק קטן (5-20 עובדים, מחזור מכירות עד 20 מיליון ₪ בשנה)',
        value: BUSINESS_VALUES.SMALL,
      },
      { label: 'מעל 20 עובדים, מחזור מכירות יותר מ20 מיליון ₪ בשנה', value: BUSINESS_VALUES.MEDIUM },
    ],
  },
  propertyOwnershipStatus: {
    label: 'האם בבעלותך נכס?',
    options: [
      { label: 'כן', value: true, endIcon: '🏠' },
      { label: 'לא', value: false, endIcon: '🏝️' },
    ],
  },
  studentStatus: {
    options: [
      { label: 'כן', value: true, endIcon: '👩‍🎓' },
      { label: 'לא', value: false, endIcon: '🙅‍' },
    ],
  },
  academicInstitution: {
    options: [
      { label: 'טכניון', value: ACADEMIC_INSTITUTION_VALUES.TECHNION },
      { label: 'אונ’ בן גוריון', value: ACADEMIC_INSTITUTION_VALUES.BG },
      { label: 'אונ’ תל אביב', value: ACADEMIC_INSTITUTION_VALUES.TLV },
    ],
  },
} as const
