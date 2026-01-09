import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import themeReducer from "./themeSlice.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer,
        theme: themeReducer
    }
});
export default store;