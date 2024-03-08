import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lat:0,
    lon:0
}

export const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers:{
        setLat : (state, action) => {
            state.lat  = action.payload
        },
        setLon : (state, action) => {
            state.lon  = action.payload
        }
    }
})


export const {setLat , setLon} = addressSlice.actions

export default addressSlice.reducer