import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getUserMedia} from "~/api/userMediaApi.js";

export const getMedia = createAsyncThunk("media", async (id) => {
    const response = await getUserMedia(id);
    return response.data;
});

const initialState = {
    images: [
        {
            id: "1",
            gallery: [
                "https://placehold.co/600x400?text=Hello+0",
                "https://placehold.co/600x400?text=Hello+1"
            ]
        },
        {
            id: "2",
            gallery: [
                "https://placehold.co/600x400?text=Hello+2",
                "https://placehold.co/600x400?text=Hello+3"
            ]
        },
        {
            id: "3",
            gallery: [
                "https://placehold.co/600x400?text=Hello+4",
                "https://placehold.co/600x400?text=Hello+5",
                "https://placehold.co/600x400?text=Hello+6"
            ]
        },
        {
            id: "4",
            gallery: [
                "https://placehold.co/600x400?text=Hello+7",
                "https://placehold.co/600x400?text=Hello+8",
                "https://placehold.co/600x400?text=Hello+9",
                "https://placehold.co/600x400?text=Hello+10"
            ]
        }
    ],
    status: 'idle',
    error: null
}

export const getMediaSlice = createSlice({
    name: "media",
    initialState,
    reducers: {
        setImages: (state, action) => {
            state.images = action.payload.images;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMedia.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getMedia.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.images = action.payload;
            })
            .addCase(getMedia.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error;
            });
    },
});

export const {setImages} = getMediaSlice.actions;
export default getMediaSlice.reducer;
