import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstance from "../../axios/axios";



export const getProfile = createAsyncThunk("profile", async (id, { rejectWithValue }) => {
            try {
                        const { data } = await axiosinstance.get(`/auth/user/${id}`)
                        return data.user;
            } catch (error) {
                        return rejectWithValue(error.response?.data.message || "get user failed")
            }
});


const profileSlice = createSlice({
            name: "profile",
            initialState: { profile: null },
            reducers: {},
            extraReducers: (builder) => {
                        builder
                                    .addCase(getProfile.pending, (state) => {
                                                state.profile = null;
                                    })
                                    .addCase(getProfile.fulfilled, (state, action) => {
                                                state.profile = action.payload;
                                                console.log(state.profile)
                                    })
                                    .addCase(getProfile.rejected, (state) => {
                                                state.profile = null
                                    })
            }
})

export default profileSlice.reducer