import {createSlice} from '@reduxjs/toolkit'

interface IVehicleIdState {
    vehicleId: string | null
}

const initialState: IVehicleIdState = {
    vehicleId: null,
}

export const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        setVehicleId: (state, action) => {
            state.vehicleId = action.payload
        },
        clearVehicleId: (state) => {
            state.vehicleId = null
        },
    },
})

// Export actions
export const {setVehicleId, clearVehicleId} = vehicleSlice.actions

// Export reducer
export default vehicleSlice.reducer
