import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authApi from "@api/authApi";
import { UserInfoState } from "@@types/authType";

const userInfoFetch = createAsyncThunk(
    'userInfoSlice/userInfoFetch',
    async ()=> {
        const response = await authApi.sessionConfirm();
        return response;
    }
)

export interface UserInfoSliceState {
    value : UserInfoState;
    status : 'idle' | 'loading' | 'failed' | 'fulfilled';
}

const initialState : UserInfoSliceState = {
    value : {useremail: "" ,username:"", userflag: ""},
    status : 'idle',
}
const userInfoSlice = createSlice({
   name:'userInfoSlice',
   initialState,
   reducers:{
    getSession : (state, action:PayloadAction<UserInfoState>) => {
        state.value = {...action.payload};
    },
    deleteSession : (state) => {
        state.value = {useremail: "" ,username:"", userflag: ""}
    }
   },
   extraReducers: (builder) => {
    builder.addCase(userInfoFetch.fulfilled, (state,action:PayloadAction<UserInfoState>)=>{
        state.value = {...action.payload};
        state.status = 'fulfilled';
    })
    builder.addCase(userInfoFetch.rejected, (state,action)=>{
        state.value = {useremail: "" ,username:"", userflag: ""};
        state.status = 'failed';
    }) 
    builder.addCase(userInfoFetch.pending, (state,action)=>{
        state.status = 'loading';
    }) 
  }
});

export default userInfoSlice.reducer;
export const {getSession , deleteSession} = userInfoSlice.actions;
export const selectGetSession = (state: UserInfoSliceState) => state.value;
export {userInfoFetch}
