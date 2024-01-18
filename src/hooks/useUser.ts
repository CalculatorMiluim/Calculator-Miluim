import {UserDetails} from '@/types/auth.types'
import {UserRole} from "@/consts/general.consts.ts";

const useUser = (): UserDetails => {
    return {fullName: "dummy", id: "dummy", mail: "asd@mail", roles: [UserRole.BASIC]}
}
export default useUser
