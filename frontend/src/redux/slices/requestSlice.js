import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstance from "../../axios/axios";

export const fetchRequest = createAsyncThunk(
            "request",
            async (_, { rejectWithValue }) => {
                        try {
                                    const { data } = await axiosinstance.get("/request");
                                    console.log(data)
                                    return data.sent || data.received;
                        } catch (error) {
                                    return rejectWithValue(error.response?.data.message);
                        }
            }
);

const requestSlice = createSlice({
            name: "request",
            initialState: {
                        request: [],
                        loading: false,
                        error: null
            },
            reducers: {},
            extraReducers: (builder) => {
                        builder
                                    .addCase(fetchRequest.pending, (state) => {
                                                state.loading = true;
                                                state.error = null;
                                    })
                                    .addCase(fetchRequest.fulfilled, (state, action) => {
                                                state.loading = false;
                                                state.request = action.payload;
                                    })
                                    .addCase(fetchRequest.rejected, (state, action) => {
                                                state.loading = false;
                                                state.error = action.payload;
                                    });
            }
});

export default requestSlice.reducer;
