import { apiSlice } from '@/features/baseApi/apiSlice.ts'
import { API_ENDPOINTS, HTTP_METHODS } from '@/consts/apiEndpoints.ts'

export const displayVehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDisplayVehicleInfo: builder.query({
      query: (id) => ({
        url: `${API_ENDPOINTS.SOME_API}/${id}`,
        method: HTTP_METHODS.GET,
      }),
      // can be added if we want
      // transformResponse: transformVehicleResponse,
    }),
  }),
})

export const { useGetDisplayVehicleInfoQuery } = displayVehicleApiSlice
