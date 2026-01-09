import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: null,
        otherUsers: null,
        selectedUser: null,
        searchInput: "",
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setSearchInput: (state, action) => {
            state.searchInput = action.payload;
        }
    }
});
export const { setAuthUser, setOtherUsers, setSelectedUser, setSearchInput } = userSlice.actions;
export default userSlice.reducer;