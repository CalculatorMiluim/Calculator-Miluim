import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {apiSlice} from '@/features/baseApi/apiSlice.ts'
import authSlice from '@/features/auth/authSlice.ts'
import appSlice from '@/features/app/appSlice.ts'
import modalSlice from '@/features/modal/modalSlice.ts'

export const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    app: appSlice,
    modal: modalSlice,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
