import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menus: null,
  isOpened: false,
  menuDrawerWidth: 70,
  subMenuDrawerWidth: 0,
  activeMenu: null,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setMenus: (state, action) => {
      state.menus = action.payload;
    },
    openMenus: (state) => {
      state.isOpened = true;
      state.menuDrawerWidth = 250;
    },
    closeMenus: (state) => {
      state.isOpened = false;
      state.menuDrawerWidth = 0;
    },
    toggleMenus: (state) => {
      state.isOpened = !state.isOpened;
      state.menuDrawerWidth = state.isOpened ? 250 : 70;
    },
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { setMenus, openMenus, closeMenus, toggleMenus, setActiveMenu } =
  sidebarSlice.actions;

export const selectSidebar = (state) => state.sidebar;

export default sidebarSlice.reducer;
