import {createSlice} from "@reduxjs/toolkit";

export const getKeyword = createSlice({
    name: 'keyword',
    initialState:{},
    reducers: {
        setKeyword(state, payload) {
            state.keyword = payload.payload.keyword;
        }
    },
})

export const {
    setKeyword,
} = getKeyword.actions;

export const selectKeyword = (state) => state.keyword;

