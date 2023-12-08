import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getCitiesApi} from "~/api/provincesApi.js";

const initialState = {
    values: [],
    loading: false,
    error: null,
    success: false,
};

export const getCities = createAsyncThunk("cities", async () => {
    const response = await getCitiesApi();
    return response.data;
});

export const getCitiesSlice = createSlice({
    name: "cities",
    initialState,
    reducers: {
        setGetCitiesLoading: (state, action) => {
            state.loading = action.payload;
        },
        setGetCitiesError: (state, action) => {
            state.error = action.payload;
        },
        setGetCitiesSuccess: (state, action) => {
            state.success = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getCities.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getCities.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getCities.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.values = action.payload;
                state.error = false;
            });
    }
});

export const {
    setGetCitiesLoading,
    setGetCitiesError,
    setGetCitiesSuccess,
} = getCitiesSlice.actions;

export const selectGetCitiesIsLoading = (state) => state.cities.loading;
export const selectGetCitiesIsError = (state) => state.cities.error;
export const selectGetCitiesIsSuccess = (state) => state.cities.success;
export const selectCities = (state) => state.cities.values;

export default getCitiesSlice.reducer;