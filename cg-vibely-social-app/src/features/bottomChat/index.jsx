import {createSlice} from "@reduxjs/toolkit";


export const bottomChatSlice = createSlice({
    name: 'bottomChatStatus',
    initialState: {
        active: false
    },
    reducers:{
        setBtChatActive: state => void (state.active = true),
        setBtChatInactive: state => void (state.active = false)
    }
});

export const {
    setBtChatActive,
    setBtChatInactive,
} = bottomChatSlice.actions

export const selectBottomChatStatus = state => state.bottomChatStatus.active
export default bottomChatSlice.reducer