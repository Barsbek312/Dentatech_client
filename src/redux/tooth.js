import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toothAPI } from "../API/API";

export const getPatientToothStatus = createAsyncThunk("tooth/patient-tooth-status", async (patientId, thunkAPI) => {
    try {
        const res = await toothAPI.getPatentToothStatus(patientId);

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
    tooth: null,
    loadingTooth: false
}

const toothSlice = createSlice({
    initialState,
    name: 'tooth',
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getPatientToothStatus.pending, state => {
                state.loadingTooth = true;
            })
            .addCase(getPatientToothStatus.fulfilled, (state, action) => {
                state.tooth = action.payload.data;
                state.loadingTooth = false;
            })
            .addCase(getPatientToothStatus.rejected, state => {
                state.loadingTooth = false;
            })

    }
})

export const { } = toothSlice.actions
export default toothSlice.reducer