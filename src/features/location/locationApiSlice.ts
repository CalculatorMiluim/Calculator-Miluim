import { apiSlice } from '@/features/baseApi/apiSlice.ts'
import { API_ENDPOINTS, HTTP_METHODS } from '@/consts/apiEndpoints.ts'
import { ILocationResponse, ISearchLocation } from '@/types/location.types'
import { setLocations } from './locationSlice'

export const locationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocationResults: builder.mutation<ILocationResponse, ISearchLocation>({
      query: (search) => ({
        url: API_ENDPOINTS.LOCATION,
        method: HTTP_METHODS.GET,
        params: search,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled
        dispatch(setLocations(data))
      },
    }),
  }),
})

export const { useGetLocationResultsMutation } = locationApiSlice
