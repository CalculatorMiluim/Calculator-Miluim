import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store.ts'

interface Token {
  token: string | null
}

const initialState: Token = { token: null }
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string | null>) => {
      state.token = payload
    },
    logOut: (state, _: PayloadAction) => {
      state.token = null
    },
  },
})

export const { setToken, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: RootState) => state.auth.token
