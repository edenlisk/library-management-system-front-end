import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        userData: null,
        accessibility:null
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.token = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setAccessibility:(state,action)=>{
            state.accessibility=action.payload
        }
    }
})

export const { setAuthToken, setUserData, setAccessibility } = authSlice.actions;

export default authSlice.reducer;
