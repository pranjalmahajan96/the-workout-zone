import { configureStore } from '@reduxjs/toolkit';
import  userReducer  from "../features/user/userSlice";
import videoReducer from "../features/videos/videoSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer
  },
});
