import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userIn: false,
    userId: null,
    userBookmarks: [],
  },
  reducers: {
    setUserIn(state, { payload }) {
      state.userIn = payload;
    },
    setUserId(state, { payload }) {
      state.userId = payload;
    },
    setUserBookmarks(state, { payload: { adsId } }) {
      const adsIdList = Array.isArray(adsId) ? adsId : [adsId];
      const uniqueAdsId = adsIdList.filter(
        (adsId) => !state.userBookmarks.includes(adsId)
      );
      state.userBookmarks = state.userBookmarks.concat(uniqueAdsId);
    },
    deleteUserBookmarks(state, action) {
      state.userBookmarks = state.userBookmarks.filter(
        (id) => id !== action.payload.adsId
      );
    },
  },
});

export const { setUserIn, setUserId, setUserBookmarks, deleteUserBookmarks } =
  userSlice.actions;
export default userSlice.reducer;
