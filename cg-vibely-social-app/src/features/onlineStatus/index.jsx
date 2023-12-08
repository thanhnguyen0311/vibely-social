import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getStatus} from "~/api/friendsStatusApi.js";


export const getFriendsStatus = createAsyncThunk("friendStatus", async (friends) => {
    const response = await getStatus(friends)
    return response.data
})
export const onlineStatusSlice = createSlice({
    name: 'onlineStatus',
    initialState: {
        value: {},
        loading: false,
        error: null,
        success: false,
    },
    extraReducers: builder =>  {
        builder
            .addCase(getFriendsStatus.pending, state => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getFriendsStatus.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getFriendsStatus.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.value = action.payload;
                state.error = false;
            })
    }
})

export const selectOnlineList = (state) => state.onlineStatus.value
export default onlineStatusSlice