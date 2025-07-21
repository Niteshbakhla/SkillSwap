import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice"
import profileSlice from "./slices/profileSlice"
import requestSlice from "./slices/requestSlice"

const store = configureStore({
            reducer: {
                        auth: authSlice,
                        profile: profileSlice,
                        request: requestSlice
            }
});

export default store;