import {configureStore} from '@reduxjs/toolkit'
import CartSlice from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        CartSlice: CartSlice,
    }
})

export const makeStore = () => {
    return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']