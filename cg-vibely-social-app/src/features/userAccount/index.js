import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {checkEmailApi, loginApi, registerApi, checkEmailForgotApi} from "~/api/accountApi.js";
import {fetchUserInfoFromGoogle, googleLoginApi} from "~/api/oauth2Api.js";


export const loginToAccount = createAsyncThunk("login", async (data) => {
    const response = await loginApi(data);
    return response.data
})

export const registerAccount = createAsyncThunk("register", async (data) => {
    const response = await registerApi(data);
    return response.data
})

export const checkEmail = createAsyncThunk("check-email", async (data) => {
    return await checkEmailApi(data)
})

export const checkEmailForgot = createAsyncThunk("check-email-forgot", async (data) => {
    return await checkEmailForgotApi(data)
})

export const googleLogin = createAsyncThunk("google-login", async (data) => {
    const userInfo = await fetchUserInfoFromGoogle(data);
    const response = await googleLoginApi(userInfo);
    return response.data;
})

const initialState = {
    user: {},
    loading: false,
    error: null,
    loginSuccess: false,
    checkEmailSuccess: false,
    registerSuccess: false,
    registerError: false,
    checkEmailForgotSuccess: false,
    checkEmailForgotError: false,
    isGoogleAccount: false
}
export const userAccountSlice = createSlice({
    name: 'userAccount',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccess: (state, action) => {
            state.loginSuccess = action.payload;
        },
        setGoogleAccount: (state, action) => {
            state.isGoogleAccount = action.payload;
        },
        resetAccountState: state => {
            state.loading = false;
            state.error = null;
            state.loginSuccess = false;
            state.checkEmailSuccess = false;
            state.registerSuccess = false;
            state.registerError = false;
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setCheckEmailForgotSuccess: (state,action) => {
            state.checkEmailForgotSuccess = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginToAccount.pending, (state) => {
                state.loginSuccess = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(loginToAccount.rejected, (state, action) => {
                state.loginSuccess = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(loginToAccount.fulfilled, (state, action) => {
                state.loginSuccess = true;
                state.loading = false;
                state.user = action.payload;
                state.error = false;
            })
            //Register
            .addCase(registerAccount.pending, (state) => {
                state.registerSuccess = false;
                state.loading = true;
                state.registerError = false;
            })
            .addCase(registerAccount.rejected, (state, action) => {
                state.registerSuccess = false;
                state.loading = false;
                state.registerError = action.error;
            })
            .addCase(registerAccount.fulfilled, (state) => {
                state.registerSuccess = true;
                state.loading = false;
                state.registerError = false;
            })
            //Check email
            .addCase(checkEmail.pending, (state) => {
                state.checkEmailSuccess = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(checkEmail.rejected, (state, action) => {
                state.checkEmailSuccess = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(checkEmail.fulfilled, (state, action) => {
                state.checkEmailSuccess = true;
                state.loading = false;
                state.error = action.payload;
            })
            //check forgot email
            .addCase(checkEmailForgot.pending, (state) => {
                state.checkEmailForgotSuccess = false;
                state.loading = true;
                state.checkEmailForgotError = false;
            })
            .addCase(checkEmailForgot.rejected, (state, action) => {
                state.checkEmailForgotSuccess = false;
                state.loading = false;
                state.checkEmailForgotError = action.error;
            })
            .addCase(checkEmailForgot.fulfilled, (state, action) => {
                state.checkEmailForgotSuccess = true;
                state.loading = false;
                state.checkEmailForgotError = false;
            })
            //Google login
            .addCase(googleLogin.pending, (state) => {
                state.loginSuccess = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.loginSuccess = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.loginSuccess = true;
                state.loading = false;
                state.user = action.payload;
                state.error = false;
                state.isGoogleAccount = true;
            })
    }
})

export const {
    setLoading,
    setError,
    setSuccess,
    resetAccountState,
    setCheckEmailForgotSuccess,
    setUser
} = userAccountSlice.actions;

export const selectUserAccountSliceIsLoading = (state) => state.userAccount.loading;
export const selectCheckEmailIsSuccess = (state) => state.userAccount.checkEmailSuccess;
export const selectAccountError = (state) => state.userAccount.error;
export const selectRegisterIsSuccess = (state) => state.userAccount.registerSuccess;
export const selectRegisterIsError = (state) => state.userAccount.registerError;
export const selectLoginIsSuccess = (state) => state.userAccount.loginSuccess;
export const selectUserData = (state) => state.userAccount.user;
export const selectCheckEmailForgotSuccess = (state) => state.userAccount.checkEmailForgotSuccess;
export const selectCheckEmailForgotError = (state) => state.userAccount.checkEmailForgotError;
export const selectCheckGoogleAccount = (state) => state.userAccount.isGoogleAccount;


export default userAccountSlice.reducer;