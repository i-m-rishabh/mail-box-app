import { createSlice } from "@reduxjs/toolkit";

let storedData = {
    idToken: '',
    email: '',
    localId: '',
    isLoggedIn: false,
}
const storedDatainJson = localStorage.getItem('data')
if(storedDatainJson){
    storedData = {...JSON.parse(storedDatainJson)};
}
const initialState = {
    idToken: storedData.idToken,
    email: storedData.email,
    localId: storedData.localId,
    isLoggedIn: storedData.isLoggedIn,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action){
            state.idToken = action.payload.idToken;
            state.email = action.payload.email;
            state.localId = action.payload.localId;
            state.isLoggedIn = true;
        },
        logout(state){
            state.idToken = '';
            state.isLoggedIn = false; 
            state.email = '';
            state.localId = '';
        },
    }
})

export const authActions = authSlice.actions;
export default authSlice;