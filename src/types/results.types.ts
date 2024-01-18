interface IRecruitmentDate {
    start_date: Date
    end_date: Date
    recruitment_type: string
}

export interface IReservistProfile {
    recruitment_date: IRecruitmentDate[]
    recruitment_type: string
    combat_level: string
    family_status: {
        partner?: string
        children?: string
        student?: string
        employment_status: string
        business_size?: string
        property_owner: boolean
        active_reservist: boolean
    }
}


export interface IBenefit {
    title: string
    description: string
    amount: number
    link_to_source: string
}
