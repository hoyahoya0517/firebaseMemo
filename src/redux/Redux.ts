import { configureStore, createSlice } from "@reduxjs/toolkit";

export interface NavStateType {
  nav: boolean;
  memo: boolean;
}

const initialState: NavStateType = {
  nav: false,
  memo: false,
};

const navSlice = createSlice({
  name: "nav&memo",
  initialState,
  reducers: {
    navOff: (state) => {
      state.nav = false;
    },
    navOn: (state) => {
      state.nav = true;
    },
    memoOff: (state) => {
      state.memo = false;
    },
    memoOn: (state) => {
      state.memo = true;
    },
  },
});

export const store = configureStore({
  reducer: navSlice.reducer,
});

export const { navOff, navOn, memoOff, memoOn } = navSlice.actions;
