import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { patientAPI } from "../API/API";

export const getPatient = createAsyncThunk("patient/getPatient", async (clinicId, thunkAPI) => {
    try {
        const res = await patientAPI.getPatient(clinicId);

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

export const getOnePaient = createAsyncThunk("patient/getOnePatient", async (patientId, thunkAPI) => {
    try {
        const res = await patientAPI.getOnePatient(patientId);

        if (res.status === 200) {
            return res;
        } else {
            const error = await res.text()
            return thunkAPI.rejectWithValue(error)
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})

export const getDistrict = createAsyncThunk("patient/district", async (_, thunkAPI) => {
    try {
        const res = await patientAPI.getDistrict();

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

export const createPatient = createAsyncThunk("patiet/createPatient", async (data, thunkAPI) => {
    const body = JSON.stringify(data);

    try {
        const res = await patientAPI.createPatient(body);

        if (res.status === 201) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const updatePatient = createAsyncThunk("patient/updatePatient", async (data, thunkAPI) => {
    const { id, ...curData } = data;

    const body = JSON.stringify(curData.data);

    try {
        const res = await patientAPI.updatePatient(body, id);

        if (res.status === 200) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})

export const getPatientStatus = createAsyncThunk('patient/patientStatus', async (_, thunkAPI) => {
    try {
        const res = await patientAPI.getPatientStatus()

        if (res.status === 200) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error)
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})

export const getPatientType = createAsyncThunk('patient/patientType', async (_, thunkAPI) => {
    try {
        const res = await patientAPI.getPatientType()

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

export const getPatientSchedule = createAsyncThunk('patient/get-patient-schedule', async (patientId, thunkAPI) => {
    try {
        const res = await patientAPI.getPatientSchedule(patientId);

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

export const getStaffPatientList = createAsyncThunk('patient/get-staff-patient-list', async (staffId, thunkAPI) => {
    try {
        const res = await patientAPI.getStaffPatientList(staffId);

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
    loadingPatient: false,
    patient: null,
    patientCard: null,
    district: null,
    patientStatus: null,
    patientType: null,
    patientSchedule: null,
    staffPatientList: null
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
            .addCase(getPatient.fulfilled, (state, action) => {
                state.loadingPatient = false;
                state.patient = action.payload.data;
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
            .addCase(getOnePaient.pending, state => {
                state.loadingPatient = true
            })
            .addCase(getOnePaient.fulfilled, (state, action) => {
                state.loadingPatient = false;
                state.patientCard = action.payload.data;
            })
            .addCase(getOnePaient.rejected, state => {
                state.loadingPatient = false;
            })
            .addCase(getPatientStatus.pending, state => {
                state.loadingPatient = true;
            })
            .addCase(getPatientStatus.fulfilled, (state, action) => {
                state.loadingPatient = false;
                state.patientStatus = action.payload.data;
            })
            .addCase(getPatientStatus.rejected, state => { state.loadingPatient = false })
            .addCase(getPatientType.pending, state => { state.loadingPatient = true })
            .addCase(getPatientType.fulfilled, (state, action) => {
                state.loadingPatient = false;
                state.patientType = action?.payload?.data;
            })
            .addCase(getPatientType.rejected, state => { state.loadingPatient = false })
            .addCase(updatePatient.pending, state => { state.loadingPatient = true })
            .addCase(updatePatient.fulfilled, (state, action) => {
                state.patientCard = action.payload.data;
                state.loadingPatient = false;
            })
            .addCase(updatePatient.rejected, state => { state.loadingPatient = false })
            .addCase(getPatientSchedule.pending, state => {
                state.loadingPatient = true;
            })
            .addCase(getPatientSchedule.fulfilled, (state, action) => {
                state.loadingPatient = false;
                state.patientSchedule = action.payload.data;
            })
            .addCase(getPatientSchedule.rejected, state => {
                state.loadingPatient = false;
            })
            .addCase(getStaffPatientList.pending, state => {
                state.loadingPatient = true;
            })
            .addCase(getStaffPatientList.fulfilled, (state, action) => {
                state.loadingPatient = false;
                state.staffPatientList = action.payload.data;
            })
            .addCase(getStaffPatientList.rejected, state => {
                state.loadingPatient = false;
            })

    }
})

export const { } = patientSlice.actions;
export default patientSlice.reducer;