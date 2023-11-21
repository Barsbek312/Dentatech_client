import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { scheduleAPI } from "../API/API";


export const getScheduleAndPatients = createAsyncThunk("schedule/getScheduleAndPatients", async (staffId, thunkAPI) => {
    try {
        const res = await scheduleAPI.getScheduleAndPatients(staffId);

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

export const getStatusSchedule = createAsyncThunk("schedule/getStatus", async (_, thunkAPI) => {
    try {
        const res = await scheduleAPI.getStatusSchedule();

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

export const addAdmission = createAsyncThunk('schedule/addAdmission', async(data, thunkAPI) => {
    const body = JSON.stringify(data);

    try {
        const res = await scheduleAPI.addAdmission(body);

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
    loadingSchedule: false,
    schedule: null,
    statusSchedule: null,
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
            .addCase(getStatusSchedule.pending, state => {
                state.loadingSchedule = true;
            })
            .addCase(getStatusSchedule.fulfilled, (state, action) => {
                state.loadingSchedule = false;
                state.statusSchedule = action.payload.data;
            })
            .addCase(getStatusSchedule.rejected, state => {
                state.loadingSchedule = false;
            })
            .addCase(addAdmission.pending, state => {
                state.loadingSchedule = true;
            })
            .addCase(addAdmission.fulfilled, (state, action) => {
                state.loadingSchedule = false;
                state.schedule = [...state.schedule, action.payload.data];
                console.log(state.schedule)
            })
            .addCase(addAdmission.rejected, state => {
                state.loadingSchedule = false;
            })
    }
})

export const {} = scheduleSlice.actions
export default scheduleSlice.reducer