import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    to: '',
    id: '',
    from: '',
    subject: '',
    text: '',
    isRead: false,
}
const activeEmailInfoSlice = createSlice({
    name: 'activeEmailInfo',
    initialState,
    reducers:{
        setEmail(state, action){
            const {id, from, subject, text, isRead, to} = action.payload;
            state.id = id;
            state.from = from;
            state.to = to;
            state.subject = subject;
            state.text = text;
            state.isRead = isRead;
        },
    }
})

export const activeEmailInfoActions = activeEmailInfoSlice.actions; 
export default activeEmailInfoSlice;