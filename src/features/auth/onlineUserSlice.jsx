import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	onlineUsers: [],
};

const authSlice = createSlice({
	name: "onlineUsers",
	initialState,
	reducers: {
		setOnlineUser: (state, action) => {
			state.onlineUsers = action.payload;
		},
	},
});

export const { setOnlineUser } = authSlice.actions;

export const selectOnlineUser = (state) => state.onlineUsers;

export default authSlice.reducer;
