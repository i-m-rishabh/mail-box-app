import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inboxMails: [],
    sentBoxMails: [],
}
const mailsSlice = createSlice({
    name:'mailsSlice',
    initialState,
    reducers:{
        setInboxMails(state, action){
            state.inboxMails = action.payload;
        },
        deleteInboxMail(state, action){
          state.inboxMails = state.inboxMails.filter((mail)=>{
            return mail.id!==action.payload;
          })  
        },
        setSentBoxMails(state, action){
            state.sentBoxMails = action.payload;
        },
        clearMails(state, action){
            state.inboxMails = [];
            state.sentBoxMails = [];
        }
    }
})

export const mailsSliceActions = mailsSlice.actions;
export default mailsSlice;