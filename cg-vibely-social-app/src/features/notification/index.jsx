import {createSlice} from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState:[],
    reducers: {
        addNotify: (state, action) => [...state, action.payload]
    }
});

export const {addNotify} = notificationSlice.actions
export const selectNotifications = state => state.notifications