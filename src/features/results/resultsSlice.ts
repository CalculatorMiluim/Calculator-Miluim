import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/store.ts'

interface IBenefit {
  title: string
  description: string
  amount: number
  link_to_source: string
}

interface IResults {
  benefits: IBenefit[]
  total_amount: number
}

const initialState: IResults = {
  benefits: [],
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
