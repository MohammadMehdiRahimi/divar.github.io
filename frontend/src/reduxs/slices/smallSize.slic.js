import { createSlice } from "@reduxjs/toolkit";
const smallSizeSlice = createSlice({
  name: "smallSize",
  initialState: {
    isSmall: false,
  },
  reducers: {
    setIsSmall(state, action) {
      state.isSmall = action.payload;
    },
  },
});
export const { setIsSmall } = smallSizeSlice.actions;
export default smallSizeSlice.reducer;
