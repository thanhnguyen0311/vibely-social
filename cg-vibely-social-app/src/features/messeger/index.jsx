import {createSlice} from "@reduxjs/toolkit";


export const messengerSlice = createSlice(
    {
        name: 'messenger',
        initialState: {
            unreadMessageCount: {},
            newMessages: []
        },
        reducers: {
            addUnreadMessage: (state, action) => {
                const sender = action.payload.sender
                if (state.unreadMessageCount[sender]){
                    state.unreadMessageCount[sender] += 1
                }else {
                    state.unreadMessageCount[sender] = 1
                }
            },
            addNewMessage: (state,action) => {
                if (action.payload) {
                    state.newMessages = [...state.newMessages, action.payload]
                }
            },
            resetNewMessages: (state) => void (state.newMessages = []),
            resetUnreadMessage: (state, action) => void (state.unreadMessageCount[action.payload] = 0)
        }
    }
);

export const {
    addUnreadMessage,
    addNewMessage,
    resetNewMessages,
    resetUnreadMessage
} = messengerSlice.actions

export const selectUnreadMessage = (state) => state.messenger.unreadMessageCount
export const selectNewsMessages = (state) => state.messenger.newMessages

export default messengerSlice.reducer