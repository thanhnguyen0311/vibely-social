import {createSlice} from "@reduxjs/toolkit";

const initialState = {};

export const switchConversationSlice = createSlice(
    {
        name: 'switchConversation',
        initialState,
        reducers:{
            switchConversationTo: (state, action)=> {
                return action.payload
            }
        }
    }
)

export const {switchConversationTo} = switchConversationSlice.actions
export const selectConversation = state => state.switchConversation
export default switchConversationSlice.reducer