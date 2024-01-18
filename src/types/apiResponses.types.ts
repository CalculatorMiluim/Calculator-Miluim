interface IBenefit {
    title: string
    description: string
    amount: number
    link_to_source: string
}

export interface IGetResultResponse {
    benefits: IBenefit[]
    total_amount: number
}
