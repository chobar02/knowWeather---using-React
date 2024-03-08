import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "./address/addressSlice"

export const store = configureStore({
    reducer: {
        address: addressReducer,
    },
})