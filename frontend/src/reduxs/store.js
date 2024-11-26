import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice.js";
import smallSizeReducer from "./slices/smallSize.slic.js";
import adsReducer from "./slices/ads.slice.js";
const store = configureStore({
  reducer: {
    user: userReducer,
    smallSize: smallSizeReducer,
    ads: adsReducer,
  },
});

export default store;
