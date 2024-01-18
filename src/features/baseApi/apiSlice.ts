import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Config } from '@/config.ts'
import { RootState } from '@/store.ts'
import { logOut } from '@/features/auth/authSlice.ts'
import { StatusCodes } from 'http-status-codes'

const baseQuery = fetchBaseQuery({
  baseUrl: Config.BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const token = state.auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithAuth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions)
  if (result?.error?.status === StatusCodes.UNAUTHORIZED) {
    api.dispatch(logOut())
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
})
