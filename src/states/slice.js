import { createSlice } from "@reduxjs/toolkit";

const initialState={
    mode:"dark",
    academicYear:"",
}

export const globalSlice=createSlice({
    name:"global",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode=state.mode === "light" ? "dark": "light";
        },
        setAcademicYear:(state,action)=>{
            state.academicYear=action.payload.academicYear;
        }
    }
})
export const {setMode,setAcademicYear}=globalSlice.actions;
export default globalSlice.reducer;