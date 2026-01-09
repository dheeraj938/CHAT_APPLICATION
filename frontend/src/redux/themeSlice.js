import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        currentTheme: "midnight", // Default theme
    },
    reducers: {
        setTheme: (state, action) => {
            state.currentTheme = action.payload;
            localStorage.setItem("appTheme", action.payload);
        },
        loadTheme: (state) => {
            const savedTheme = localStorage.getItem("appTheme") || "midnight";
            state.currentTheme = savedTheme;
        }
    }
});

export const { setTheme, loadTheme } = themeSlice.actions;
export default themeSlice.reducer;
