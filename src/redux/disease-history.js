import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { diseaseHistoryAPI } from "../API/API";

export const getDiseaseHistory = createAsyncThunk('disease-history/get-disease-history', async ({ patientId, toothId }, thunkAPI) => {
    try {
        const res = await diseaseHistoryAPI.getDiseaseHistory(patientId, toothId);

        if (res.status === 200) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const getDiseaseHistoryOfReception = createAsyncThunk('disease-history/get-disease-history-of-reception', async (receptionId, thunkAPI) => {
    try {
        const res = await diseaseHistoryAPI.getDiseaseHistoryOfReception(receptionId);

        if (res.status === 200) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

let initialState = {
    loadingDiseaseHistory: false,
    diseaseHistory: null,
    receptionDiseaseHistory: null
}

const diseaseHistorySlice = createSlice({
    name: 'diseaseHistory',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getDiseaseHistory.pending, state => {
                state.loadingDiseaseHistory = true;
            })
            .addCase(getDiseaseHistory.fulfilled, (state, action) => {
                state.loadingDiseaseHistory = false;
                state.diseaseHistory = action.payload.data;
            })
            .addCase(getDiseaseHistory.rejected, state => {
                state.loadingDiseaseHistory = false;
            })
            .addCase(getDiseaseHistoryOfReception.pending, state => {
                state.loadingDiseaseHistory = true;
            })
            .addCase(getDiseaseHistoryOfReception.fulfilled, (state, action) => {
                state.loadingDiseaseHistory = false;
                state.receptionDiseaseHistory = action.payload.data;
            })
            .addCase(getDiseaseHistoryOfReception.rejected, state => {
                state.loadingDiseaseHistory = false;
            })
    }
})

export const { } = diseaseHistorySlice.actions
export default diseaseHistorySlice.reducer;