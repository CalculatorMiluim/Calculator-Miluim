import { IBenefitAgg } from '@/types/apiResponses.types.ts'

interface IRecruitmentDate {
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
    partner?: string | null
    children?: IChildren
  }
  student?: string
  academy: string
  business_size?: string | null
  property_owner: boolean
  active_reservist: boolean
  employment_status: string
}

export const BENEFITS_TYPES_MAP = {
  VOUCHER: 'Voucher',
  GRANT: 'Grant',
  AUTOMATIC_GRANT: 'Automatic_Grant',
} as const
