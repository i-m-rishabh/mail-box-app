import { createSlice } from "@reduxjs/toolkit";

const activeSlice = createSlice({
    name: 'activeSlice',
    initialState:{
        active:'inbox',
        totalUnread: 0,
    },
    reducers:{
        setActive(state,action){
            state.active = action.payload;
        },
        setTotalUnread(state, action){
            state.totalUnread = action.payload;
        }
    }
});

export const activeActions = activeSlice.actions;
export default activeSlice;