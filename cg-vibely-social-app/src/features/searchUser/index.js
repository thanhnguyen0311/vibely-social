import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {searchUserApi} from "~/api/searchUserApi.js";

const initialState = {
    values: [],
    loading: false,
    error: null,
    success: false,
};

export const searchUser = createAsyncThunk("users", async (params) => {
    const response = await searchUserApi(params.keyword, params.page);
    return response.data;
});

export const searchUserSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setSearchUsersLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSearchUsersError: (state, action) => {
            state.error = action.payload;
        },
        setSearchUsersSuccess: (state, action) => {
            state.success = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(searchUser.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(searchUser.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(searchUser.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.values = action.payload;
                state.error = false;
            });
    }
});

export const {
    setSearchUsersLoading,
    setSearchUsersError,
    setSearchUsersSuccess,
} = searchUserSlice.actions;

export const selectSearchUsersIsLoading = (state) => state.users.loading;
export const selectSearchUsersIsError = (state) => state.users.error;
export const selectSearchUsersIsSuccess = (state) => state.users.success;
export const selectUsers = (state) => state.users.values;

export default searchUserSlice.reducer;