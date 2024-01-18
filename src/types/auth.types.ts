import { UserRole } from '@/consts/general.consts'

type IUserRoles = (typeof UserRole)[keyof typeof UserRole][]

export type UserDetails = {
  fullName: string
  id: string
  mail: string
  roles: IUserRoles
}

export type IAuthGuard = {
  allowedRoles: UserRole[]
}
