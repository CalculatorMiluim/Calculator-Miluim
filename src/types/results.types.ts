import { IBenefitAgg } from '@/types/apiResponses.types.ts'

export interface IRecruitmentDate {
  start_date: string
  end_date: string
  recruitment_type: string
}

interface IChildren {
  is_under_14?: boolean
  is_special_needs?: boolean
}

export interface IReservistProfile {
  recruitment_dates: IRecruitmentDate[]
  combat_level: string
  family_status: {
    partner?: { employment_status: string } | null
    children?: IChildren
  }
  student?: string
  academy: string | null
  business_size?: string | null
  property_owner: boolean
  active_reservist: boolean
  employment_status: string
  is_commander: boolean
}

export const BENEFITS_TYPES_MAP = {
  VOUCHER: 'Voucher',
  GRANT: 'Grant',
  AUTOMATIC_GRANT: 'Automatic_Grant',
  NO_MONEY_BENEFIT: 'No_Money_Benefit',
} as const
