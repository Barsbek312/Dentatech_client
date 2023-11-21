import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { patientAPI } from "../API/API";

export const getPatient = createAsyncThunk("patient/getPatient", async(branchId, thunkAPI) => {
    try {
        const res = await patientAPI.getPatient(branchId);

        if(res.status === 200) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const getDistrict = createAsyncThunk("patient/district", async(_, thunkAPI) => {
    try {
        const res = await patientAPI.getDistrict();

        if(res.status === 200) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const createPatient = createAsyncThunk("patiet/createPatient", async(data, thunkAPI) => {
    const body = JSON.stringify(data);

    try{
        const res = await patientAPI.createPatient(body);

        if(res.status === 201) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

let initialState = {
    loadingPatient: false,
    patient: null,
    district: null,
}

const patientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getPatient.pending, state => {
                state.loadingPatient = true;
            })
            .addCase(getPatient.fulfilled, (state,action) => {
                state.patient = action.payload.data
                state.loadingPatient = false;
            })
            .addCase(getPatient.rejected, state => {
                state.loadingPatient = false;
            })
            .addCase(getDistrict.pending, state => {
                state.loadingPatient = true;
            })
            .addCase(getDistrict.fulfilled, (state, action) => {
                state.loadingPatient = false;
                state.district = action.payload.data;
            })
            .addCase(getDistrict.rejected, state => {
                state.loadingPatient = false;
            })
            .addCase(createPatient.pending, state => {
                state.loadingPatient = true;
            })
            .addCase(createPatient.fulfilled, (state, action) => {
                state.loadingPatient = false;
                state.patient = [...state.patient, action.payload.data];
            })
            .addCase(createPatient.rejected, state => {
                state.loadingPatient = false;
            })
    }
})

export const {} = patientSlice.actions;
export default patientSlice.reducer;