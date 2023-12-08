import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {editUserInfoApi, userInfoApi} from "~/api/userInfoApi.js";

export const editUserInfo = async (userInfo) => {
    await editUserInfoApi(userInfo);
}


export const getUserInfo = createAsyncThunk("userInfo", async () => {
    const response = await userInfoApi();
    return response.data;
});

export const formatDate = (date = '') => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    return `${day}/${month}/${year}`;
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState:{},
    reducers: {
        setFullName(state, payload) {
            state.firstName = payload.payload.firstName;
            state.lastName = payload.payload.lastName;
        },
        setBirthday(state, payload) {
            state.birthday = payload.payload.birthday;
        },
        setGender(state, payload) {
            state.gender = payload.payload.gender;
        },
        setPhoneNumber(state, payload) {
            state.phoneNumber = payload.payload.phoneNumber;
        },
        setCity(state, payload) {
            state.city = payload.payload.city;
            state.district = payload.payload.district;
        },
        setSchool(state, payload) {
            state.school = payload.payload.school;
        },
        setWork(state, payload) {
            state.company = payload.payload.company;
            state.position = payload.payload.position;
        },
        setBio(state, payload) {
            state.bio = payload.payload.bio;
        },
        setHobbies(state, payload) {
            state.hobbies = payload.payload.hobbies;
        },
        setUserInfo: (state, action) => action.payload,
    },
    extraReducers: builder => {
        builder
            .addCase(getUserInfo.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.values = action.payload;
                state.error = false;
            });
    }
})

export const {
    setFullName,
    setBirthday,
    setGender,
    setPhoneNumber,
    setCity,
    setSchool,
    setWork,
    setBio,
    setHobbies,
    setUserInfo,
} = userInfoSlice.actions;

export default userInfoSlice.reducer