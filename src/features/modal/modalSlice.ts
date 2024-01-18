import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/store.ts'
import { IModalProps, IModalState } from '@/types/modals.types.ts'

const initialState = null as IModalState
const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    openModal: (_, action: PayloadAction<IModalProps>) => action.payload,
    closeModal: (_) => null,
  },
})

export const { closeModal, openModal } = modalSlice.actions

export default modalSlice.reducer

export const selectModal = (state: RootState) => state.modal
export const selectIsModalOpen = createSelector(selectModal, (modal) => !!modal)
