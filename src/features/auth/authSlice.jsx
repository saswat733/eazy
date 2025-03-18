
import { createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../utils/staticData";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem(CONSTANTS.companyNameLocalStorage);
      localStorage.removeItem(CONSTANTS.tokenLocalStorage);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { signin, logout, setUser } = authSlice.actions;

export const selectUser = (state) => state.auth;

export default authSlice.reducer;
