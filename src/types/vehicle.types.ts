export interface IVehicleOwner {
  id: string
  name: string
  phone_number: string
  additional_phone_number: string
}

export interface IVehicleType {
  id: string
  name: string
  is_special: boolean
  is_designated: boolean
  is_support_drag: boolean | null
}

export interface IBaseFormInfo {
  form_id: string
  creation_date: string
  is_completed: boolean
}

export interface IExtendedFormInfo extends IBaseFormInfo {
  [key: string]: any
}
export interface IDisplayVehicleInfoServerResponse {
  formManager: {
    createdAt: string
    updatedAt: string
    id: string
    arrival_form: IExtendedFormInfo | null
    retreat_form: IExtendedFormInfo | null
    issuing_form: IExtendedFormInfo | null
    documentation_vehicle_form: IExtendedFormInfo | null
    vehicle_credit_form: IExtendedFormInfo | null
  }
  vehicle: {
    createdAt: string
    updatedAt: string
    license_number: string
    license_date_expiration: string
    is_guaranteed: true
    guarantee_garage_name: string
    owner: IVehicleOwner
    vehicle_type: IVehicleType
    status: {
      id: string
      description: string
    }
    dragging_vehicle: boolean | null
    dragged_by_vehicle: boolean | null
  }
}
