import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useUser from '@/hooks/useUser'
import { IAuthGuard } from '@/types/auth.types.ts'
import React from 'react'

const AuthGuard: React.FC<IAuthGuard> = ({ allowedRoles }) => {
  const { roles } = useUser()
  const location = useLocation()
  const shouldHaveAccessToRoute = roles.some((role) => (allowedRoles as string[]).includes(role))
  if (shouldHaveAccessToRoute) {
    return <Outlet />
  }

  return <Navigate to="/unauthorized" state={{ from: location }} replace />
}
export default AuthGuard
