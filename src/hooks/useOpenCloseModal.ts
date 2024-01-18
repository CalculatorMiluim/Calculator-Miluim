import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/hooks/reduxHooks.ts'
import { closeModal } from '@/features/modal/modalSlice.ts'

export const useOpenCloseModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useAppDispatch()

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      dispatch(closeModal())
    }, 300)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsModalOpen(true)
    }, 1)
  }, [])

  return {
    handleCloseModal,
    isModalOpen,
  }
}
