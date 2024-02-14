import { ElementType, Suspense } from 'react'
import { selectModal } from '@/features/modal/modalSlice.ts'
import { ModalsMap } from './AppModal.module'
import { useAppSelector } from '@/hooks/reduxHooks.ts'

const AppModal = () => {
  const modal = useAppSelector(selectModal)

  if (!modal) {
    return null
  }

  const SelectedModal = ModalsMap.get(modal?.type) as ElementType

  return <Suspense fallback={<div>Loading...</div>}>{/*<SelectedModal {...modal.modalProps} />*/}</Suspense>
}

export default AppModal
