import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        userData: null
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.token = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        }
    }
})

export const { setAuthToken, setUserData } = authSlice.actions;

export default authSlice.reducer;
