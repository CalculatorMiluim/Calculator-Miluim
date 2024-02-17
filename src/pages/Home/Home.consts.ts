import { IHomeChoiceFormField } from '@/pages/Home/HomeChoiceFormField/HomeChoiceFormField.tsx'
import { mixed, object } from 'yup'

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
  COMBAT_SUPPORT: 'תומך לחימה',
  //SUPPORT_ROLE: 'עורפי',  // commented, not used
}

const EMPLOYMENT_STATUS_VALUES = {
  SELF_EMPLOYED: 'עצמאי',
  EMPLOYED: 'שכיר',
  OTHER: 'אחר',
  UNPAID_LEAVE: 'חל״ת',
  ELIGIBLE_FOR_UNEMPLOYMENT_BENEFITS: 'זכאי לדמי אבטלה',
}

export const ACADEMIC_INSTITUTION_VALUES = {
  TECHNION: 'הטכניון',
  TLV: 'אוניברסיטת תל אביב',
  BG: 'אוניברסיטת בן גוריון',
  BIU: 'אוניברסיטת בר אילן',
  HUJI: 'האוניברסיטה העברית בירושלים',
  HAIFA: 'אוניברסיטת חיפה',
}
export const RECRUITMENT_TYPE_VALUES = {
  TZAV_8: 'צו 8',
  TAASUKA_MIVTZAIT: 'תעסוקה מבצעית',
  OTHER: 'אחר',
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
      { label: 'אין לי בן/בת זוג', value: false },
      { label: 'יש לי בן/בת זוג', value: true },
    ],
  },
  partner: {
    isFollowUpQuestion: true,
    dependsOnQuestion: 'familyStatus',
    dependsOnQuestionValue: true,
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
    dependsOnQuestion: 'isParent',
    dependsOnQuestionValue: true,
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
    dependsOnQuestion: 'employmentStatus',
    dependsOnQuestionValue: EMPLOYMENT_STATUS_VALUES.SELF_EMPLOYED,
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
    isFollowUpQuestion: true,
    dependsOnQuestion: 'studentStatus',
    dependsOnQuestionValue: false,
    options: [
      { label: 'טכניון', value: ACADEMIC_INSTITUTION_VALUES.TECHNION },
      { label: 'אונ’ בן גוריון', value: ACADEMIC_INSTITUTION_VALUES.BG },
      { label: 'אונ’ תל אביב', value: ACADEMIC_INSTITUTION_VALUES.TLV },
      { label: 'אונ’ בר אילן', value: ACADEMIC_INSTITUTION_VALUES.BIU },
      { label: 'האונ’ העברית בירושלים', value: ACADEMIC_INSTITUTION_VALUES.HUJI },
      { label: 'אונ’ חיפה', value: ACADEMIC_INSTITUTION_VALUES.HAIFA },
      { label: 'אחר', value: null },
    ],
  },
  recruitmentType: {
    options: [
      { label: 'צו 8', value: RECRUITMENT_TYPE_VALUES.TZAV_8 },
      { label: 'תעסוקה מבצעית', value: RECRUITMENT_TYPE_VALUES.TAASUKA_MIVTZAIT },
      { label: 'אחר', value: RECRUITMENT_TYPE_VALUES.OTHER },
    ],
  },
} as const

const FIELD_REQUIRED_MSG = 'יש לבחור לפחות ערך אחד'
const REQUIRED_FIELD_SCHEMA = (isRequired: boolean) =>
  mixed()
    .required(FIELD_REQUIRED_MSG)
    .test('not-empty-array', FIELD_REQUIRED_MSG, (value) =>
      isRequired ? !(Array.isArray(value) && value.length === 0) && value != null : true,
    )

const defaultRequiredFieldSchemas = Object.keys(HOME_OPTIONS_MAP).reduce(
  (acc, key) => {
    const isRequired = !HOME_OPTIONS_MAP[key]?.isFollowUpQuestion
    acc[key] = REQUIRED_FIELD_SCHEMA(isRequired)

    return acc
  },
  {} as Record<any, any>,
)
export const validationSchema = object({
  ...defaultRequiredFieldSchemas,
})
