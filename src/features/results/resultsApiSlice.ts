import { apiSlice } from '@/features/baseApi/apiSlice.ts'
import { API_ENDPOINTS, HTTP_METHODS } from '@/consts/apiEndpoints.ts'
import { IGetResultResponse } from '@/types/apiResponses.types.ts'
import { IReservistProfile } from '@/types/results.types.ts'

export const resultsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResults: builder.mutation<IGetResultResponse, IReservistProfile>({
      query: (reservistProfile) => ({
        url: API_ENDPOINTS.RESULTS,
        method: HTTP_METHODS.POST,
        body: reservistProfile,
      }),
    }),
  }),
})

export const { useGetResultsMutation } = resultsApiSlice
