import { createSlice } from '@reduxjs/toolkit'
interface IBenefit {
  title: string
  description: string
  amount: number
  link_to_source: string
}

interface IResults {
  benefits: IBenefit[]
}

const initialState: IResults = {
  benefits: [],
}

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.benefits = action.payload
    },
    clearResults: (state) => {
      state.benefits = []
    },
  },
})

// Export actions
export const { setResults, clearResults } = resultsSlice.actions

// Export reducer
export default resultsSlice.reducer
