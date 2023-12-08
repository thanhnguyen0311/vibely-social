import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {findFriends} from "~/api/friendListApi.js";

const initialState = {
    values: [],
    loading: false,
    error: null,
    success: false,
};

export const getFriends = createAsyncThunk("friends", async (id) => {
    const response = await findFriends(id);
    return response.data;
});

export const getFriendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        setGetFriendsLoading: (state, action) => {
            state.loading = action.payload;
        },
        setGetFriendsError: (state, action) => {
            state.error = action.payload;
        },
        setGetFriendsSuccess: (state, action) => {
            state.success = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getFriends.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getFriends.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getFriends.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.values = action.payload;
                state.error = false;
            });
    }
});

export const {
    setGetFriendsLoading,
    setGetFriendsError,
    setGetFriendsSuccess,
} = getFriendsSlice.actions;

export const selectGetFriendIsLoading = (state) => state.friends.loading;
export const selectGetFriendIsError = (state) => state.friends.error;
export const selectGetFriendIsSuccess = (state) => state.friends.success;
export const selectFriendList = (state) => state.friends.values;

export default getFriendsSlice.reducer;