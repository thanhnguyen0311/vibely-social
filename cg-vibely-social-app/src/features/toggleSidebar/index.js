import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    sidebarExpand: false,
    sidebarActive:false
};

export const sidebarSlice = createSlice(
    {
        name: 'sidebar',
        initialState,
        reducers:{
            toggle: (state, action)=> {
                state.sidebarExpand = action.payload
            },
            activeSidebar: (state, action) => {
                state.sidebarActive = action.payload
            }
        }
    }
)

export const {toggle, activeSidebar} = sidebarSlice.actions
export const selectSidebarPosition = state => state.sidebar.sidebarExpand
export const selectSidebarActive = state => state.sidebar.sidebarActive
export default sidebarSlice