import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userIn: false,
  },
  reducers: {
    setUser(state, action) {
      state.userIn = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
