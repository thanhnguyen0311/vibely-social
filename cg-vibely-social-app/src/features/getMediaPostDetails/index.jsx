import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getPostDetail} from "~/api/postApi.js";

export const getMediaPostDetails = createAsyncThunk("mediaPostDetails", async (id) => {
    const response = await getPostDetail(id);
    console.log(response.data);
    return response.data;
});

const initialState = {
    post: {
        "id": 1,
        author:{
            "id": 1,
            "firstName": "No",
            "lastName": "Name",
            "avatar": "https://i.pravatar.cc/150"
        },
        "content": "This is not a test",
        "privacy": "PUBLIC",
        "usersTag": [],
        "gallery": [],
        "createdDate": "2023-08-23T12:51:38.023345400",
        "like": 100,
        "commentCount": 20
    },
    status: 'idle',
    error: null
}

export const getMediaPostDetailsSlice = createSlice({
    name: "mediaPostDetails",
    initialState,
    reducers: {
        setPostDetails: (state, action) => {
            state.post = action.payload.post;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMediaPostDetails.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getMediaPostDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.post = action.payload;
            })
            .addCase(getMediaPostDetails.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error;
            });
    },
});

export default getMediaPostDetailsSlice.reducer;
