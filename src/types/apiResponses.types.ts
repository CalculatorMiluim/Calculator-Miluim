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
  Voucher: IBenefitAgg
  Grant: IBenefitAgg
  Automatic_Grant: IBenefitAgg
  total_amount: number
}
