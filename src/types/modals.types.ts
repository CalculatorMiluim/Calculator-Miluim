import { ModalType } from '@/consts/general.consts.ts'
import { FormSummaryModalTypes } from '@/components/AppModal/FormSummaryModal/FormSummaryModal.module.tsx'

export type IModalState = IModalProps | null

export interface IImagesCarouselModalProps {
  imagesSrcList: string[]
}

export interface IFormSummaryModalProps {
  vehicleId: string
  modalType: FormSummaryModalTypes
}

export type IModalProps =
  | ({ type: ModalType.IMAGES_CAROUSEL_POPUP } & { modalProps?: IImagesCarouselModalProps })
  | ({ type: ModalType.FORM_SUMMARY } & { modalProps?: IFormSummaryModalProps })

export interface BasicUserData {
  id: string
  fullName: string
}
