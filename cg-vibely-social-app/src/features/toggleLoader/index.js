import {createSlice} from "@reduxjs/toolkit";

const toggleLoader = createSlice({
    name: 'firstLoad',
    initialState: {
        isOn: false,
      },
    reducers: {
      turnOffLoader: (state) => {
        state.isOn = true;
      },
    },
  });

export const { turnOffLoader } = toggleLoader.actions;

export default toggleLoader;