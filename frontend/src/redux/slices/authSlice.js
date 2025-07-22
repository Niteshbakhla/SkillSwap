import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstance from "../../axios/axios";

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
            try {
                        const { data } = await axiosinstance.post("/auth/login", credentials);
                        return { user: data.user, message: data.message };
            } catch (error) {
                        return rejectWithValue(error.response?.data.message || "Login failed")
            }
});

export const signup = createAsyncThunk("auth/signup", async (credentials, { rejectWithValue }) => {
            try {
                        const { data } = await axiosinstance.post("/auth/register", credentials);
                        return { message: data.message }
            } catch (error) {
                        return rejectWithValue(error.response?.data.message || "Register failed");
            }
})

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
            try {
                        const { data } = await axiosinstance.get("/auth/logout");
                        return { message: data.message };
            } catch (error) {
                        return rejectWithValue(error.response?.data.message || "Logged out failed")
            }
})


export const loadUser = createAsyncThunk("auth/loadUser", async (_, { rejectWithValue }) => {
            try {
                        const { data } = await axiosinstance.get("/auth/me");
                        const user = data.user;
                        return { user }
            } catch (error) {
                        return rejectWithValue(error.message || "Failed to load user")
            }
})


const authSlice = createSlice({
            name: "auth",
            initialState: {
                        isLogin: false,
                        user: null,
                        loading: false,
                        error: null
            },
            reducers: {

            },
            extraReducers: (builder) => {
                        builder
                                    // Login
                                    .addCase(login.pending, (state) => {
                                                state.loading = true
                                                state.error = null
                                    })
                                    .addCase(login.fulfilled, (state, action) => {
                                                state.loading = false
                                                state.user = action.payload.user;
                                                state.isLogin = true
                                    })
                                    .addCase(login.rejected, (state, action) => {
                                                state.loading = false
                                                state.isLogin = false
                                                state.error = action.payload
                                    })

                        // Load user
                        builder
                                    .addCase(loadUser.pending, (state) => {
                                                state.isLogin = false
                                                state.user = null
                                    })
                                    .addCase(loadUser.fulfilled, (state, action) => {
                                                state.isLogin = true
                                                state.user = action.payload.user
                                    })
                                    .addCase(loadUser.rejected, (state, action) => {
                                                state.isLogin = false
                                                state.user = null
                                    })

                        // logout
                        builder
                                    .addCase(logout.pending, (state, action) => {
                                                state.isLogin = false
                                    })

                                    .addCase(logout.fulfilled, (state, action) => {
                                                state.isLogin = false
                                                state.user = action.payload
                                    })

                                    .addCase(logout.rejected, (state, action) => {
                                                state.isLogin = false
                                    })
            }
});

export const { fetchConversations, fetchMessages, sendMessage } = authSlice.actions;
export default authSlice.reducer;