import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/store.ts'
import { ICity, ILocationResponse } from '@/types/location.types'

const defaultValue:ICity[] = []
const initialState: ILocationResponse = {
    locations: defaultValue
}

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocations: (state, action) => action.payload,
    clearLocations: (state) => initialState,
  },
})

// Export actions
export const { setLocations, clearLocations } = locationSlice.actions

export const selectLocationResults = (state: RootState) => state.locations

// Export reducer
export default locationSlice.reducer
