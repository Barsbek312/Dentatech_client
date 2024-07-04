import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { scheduleAPI } from "../API/API";


export const getScheduleAndPatients = createAsyncThunk("schedule/getScheduleAndPatients", async (staffId, thunkAPI) => {
    try {
        const res = await scheduleAPI.getScheduleAndPatients(staffId);

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


export const getScheduleType = createAsyncThunk("schedule/getScheduleType", async (_, thunkAPI) => {
    try {
        const res = await scheduleAPI.getScheduleType();

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

export const getScheduleStatus = createAsyncThunk("schedule/get-schedule-status", async (_, thunkAPI) => {
    try {
        const res = await scheduleAPI.getScheduleStatus();

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

export const addAdmission = createAsyncThunk('schedule/addAdmission', async (data, thunkAPI) => {
    const body = JSON.stringify(data);

    try {
        const res = await scheduleAPI.addAdmission(body);

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

export const updateAdmission = createAsyncThunk('schedule/updateAdmission', async (data, thunkAPI) => {
    const { id, ...curData } = data;
    const body = JSON.stringify(curData);

    try {
        const res = await scheduleAPI.updateAdmission({ id, body });

        if (res.status === 200) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error)
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const deleteReception = createAsyncThunk('schedule/delete-reception', async (receptionId, thunkAPI) => {
    try {
        const res = await scheduleAPI.deleteReception(receptionId);

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

export const getClinicSchedule = createAsyncThunk('schedule/clinicSchedule', async (clinicId, thunkAPI) => {
    try {
        const res = await scheduleAPI.getClinicSchedule(clinicId);
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
    loadingSchedule: false,
    schedule: null,
    scheduleType: null,
    scheduleStatus: null,
}

const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getScheduleAndPatients.pending, state => {
                state.loadingSchedule = true;
            })
            .addCase(getScheduleAndPatients.fulfilled, (state, action) => {
                state.loadingSchedule = false;
                state.schedule = action?.payload?.data;
            })
            .addCase(getScheduleAndPatients.rejected, state => {
                state.loadingSchedule = false;
            })
            .addCase(getScheduleType.pending, state => {
                state.loadingSchedule = true;
            })
            .addCase(getScheduleType.fulfilled, (state, action) => {
                state.loadingSchedule = false;
                state.scheduleType = action.payload.data;
            })
            .addCase(getScheduleType.rejected, state => {
                state.loadingSchedule = false;
            })
            .addCase(addAdmission.pending, state => {
                state.loadingSchedule = true;
            })
            .addCase(addAdmission.fulfilled, (state, action) => {
                state.loadingSchedule = false;
                state.schedule = [...state.schedule, action.payload.data];
            })
            .addCase(addAdmission.rejected, state => {
                state.loadingSchedule = false;
            })
            .addCase(updateAdmission.pending, state => {
                state.loadingSchedule = true;
            })
            .addCase(updateAdmission.fulfilled, (state, action) => {
                state.loadingSchedule = false;
                const updatedReception = action.payload.data;
                if (state.schedule && state.schedule.length > 0) {
                    state.schedule.forEach((reception, index) => {
                        if (reception.id === updatedReception.id) {
                            state.schedule[index] = updatedReception;
                        }
                    })
                }
            })
            .addCase(updateAdmission.rejected, state => {
                state.loadingSchedule = false;
            })
            .addCase(getClinicSchedule.pending, state => {
                state.loadingSchedule = true;
            })
            .addCase(getClinicSchedule.fulfilled, (state, action) => {
                state.loadingSchedule = false;
                state.schedule = action.payload.data;
            })
            .addCase(getClinicSchedule.rejected, state => {
                state.loadingSchedule = false;
            })
            .addCase(deleteReception.pending, state => {
                state.loadingSchedule = true;
            })
            .addCase(deleteReception.fulfilled, (state, action) => {
                state.loadingSchedule = false;
                state.schedule = state.schedule && state.schedule.filter(reception => reception.id !== action.payload.data);
            })
            .addCase(deleteReception.rejected, state => {
                state.loadingSchedule = false;
            })
            .addCase(getScheduleStatus.pending, state => {
                state.loadingSchedule = true;
            })
            .addCase(getScheduleStatus.fulfilled, (state, action) => {
                state.loadingSchedule = false;
                state.scheduleStatus = action.payload.data;
            })
            .addCase(getScheduleStatus.rejected, state => {
                state.loadingSchedule = false;
            })
    }
})

export const { } = scheduleSlice.actions
export default scheduleSlice.reducer