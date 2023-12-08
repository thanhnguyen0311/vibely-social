import {createSlice} from "@reduxjs/toolkit";

const toggleChat = createSlice({
    name: 'openChat',
    initialState: {
      isOn: false,
    },
    reducers: {
      toggleChatButton: (state) => {
        state.isOn = !state.isOn;
      },
    },
  });

export const { toggleChatButton } = toggleChat.actions;

export default toggleChat;