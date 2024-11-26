import { createSlice } from "@reduxjs/toolkit";

const adsSlice = createSlice({
  name: "ads",
  initialState: {
    categoryId: null,
  },
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
  },
});

export const { setCategoryId } = adsSlice.actions;
export default adsSlice.reducer;
