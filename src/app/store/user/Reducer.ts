"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "",
  },
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserTest(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUserTest } = userSlice.actions;
export default userSlice;
