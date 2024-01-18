import {ModalType} from '@/consts/general.consts.ts'

export type IModalState = IModalProps | null


export type IModalProps = ({ type: ModalType.IMAGES_CAROUSEL_POPUP })

export interface BasicUserData {
    id: string
    fullName: string
}
