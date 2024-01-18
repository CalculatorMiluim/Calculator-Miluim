export interface IGetVehicleTypesResponse {
  id: number
  name: string
  is_special: boolean
  is_designated: boolean
}

export interface IPartialGetOptionsResponse {
  id: number
  name: string
}

export type IGenericOptionSResponse = IPartialGetOptionsResponse & IGetVehicleTypesResponse

export interface INameValue {
  name: string
  id: string
}

interface IBank {
  bank_code: string
  bank_name: string
  bank_address: string
}

export type IGetCommands = INameValue[]
export type IGetIssuingAuthorities = INameValue[]
export type IGetRecruitmentSites = INameValue[]
export type IGetBanks = IBank[]
export type IGetIturanCompanies = INameValue[]
export type IGetVehicleUnloadingUtils = INameValue[]
