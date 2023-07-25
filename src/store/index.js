import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import activeSlice from "./activeSlice";
import activeEmailInfoSlice from "./activeEmailInfoSlice";

const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        active: activeSlice.reducer,
        activeEmailInfo: activeEmailInfoSlice.reducer,
    }
})

export default store;