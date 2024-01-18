import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts'

export const useHome = () => {
  const dispatch = useAppDispatch()

  return { dummy: 'dummy' }
}
