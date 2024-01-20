import { BENEFITS_TYPES_MAP } from '@/types/results.types.ts'

interface IBenefit {
  benefit_type: string
  financial_reward: number
  other_reward: string
  title: string
  description: string
  link_to_source: string
}

export interface IBenefitAgg {
  amount: number
  benefits: IBenefit[]
}

export interface IGetResultResponse {
  [BENEFITS_TYPES_MAP.AUTOMATIC_GRANT]: IBenefitAgg
  [BENEFITS_TYPES_MAP.GRANT]: IBenefitAgg
  [BENEFITS_TYPES_MAP.VOUCHER]: IBenefitAgg
  total_amount: number
}
