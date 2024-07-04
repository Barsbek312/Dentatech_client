import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { billAPI } from "../API/API";

export const getPatientBill = createAsyncThunk('bill/get-patient-bill', async (patientId, thunkAPI) => {
    try {
        const res = await billAPI.getPatientBill(patientId);

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
    loadingBill: false,
    patientBill: null
}

const billSlice = createSlice({
    name: "bill",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getPatientBill.pending, state => {
                state.loadingBill = true;
            })
            .addCase(getPatientBill.fulfilled, (state, action) => {
                state.loadingBill = false;
                state.patientBill = action.payload.data;
            })
            .addCase(getPatientBill.rejected, state => {
                state.loadingBill = false;
            })
    }
})

export const { } = billSlice.actions
export default billSlice.reducer; 