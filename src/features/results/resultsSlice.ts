import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/store.ts'
import { IGetResultResponse } from '@/types/apiResponses.types.ts'

const defaultResultAggValue = { benefits: [], amount: 0 }
const initialState: IGetResultResponse = {
  Grant: defaultResultAggValue,
  Voucher: defaultResultAggValue,
  Automatic_Grant: defaultResultAggValue,
  total_amount: 0,
}

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResults: (state, action) => action.payload,
    clearResults: (state) => initialState,
  },
})

// Export actions
export const { setResults, clearResults } = resultsSlice.actions

export const selectResults = (state: RootState) => state.results

// Export reducer
export default resultsSlice.reducer
