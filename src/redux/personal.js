import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { personalAPI } from "../API/API";

export const getPersonal = createAsyncThunk("personal/getPersonalAll", async (clinicId, thunkAPI) => {
    try {
        const res = await personalAPI.getPersonal(clinicId);

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

export const getStaffProfile = createAsyncThunk('personal/get-staff-profile', async (staffId, thunkAPI) => {
    try {
        const res = await personalAPI.getStaffProfile(staffId);
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
    personal: null,
    loadingPersonal: false,
    profileStaff: null
}

const personalSlice = createSlice({
    name: 'personal',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getPersonal.pending, state => {
                state.loadingPersonal = true;
            })
            .addCase(getPersonal.fulfilled, (state, action) => {
                state.loadingPersonal = false;
                state.personal = action.payload.data;
            })
            .addCase(getPersonal.rejected, state => {
                state.loadingPersonal = false;
            })
            .addCase(getStaffProfile.pending, state => {
                state.loadingPersonal = true;
            })
            .addCase(getStaffProfile.fulfilled, (state, action) => {
                state.loadingPersonal = false;
                state.profileStaff = action.payload.data;
            })
            .addCase(getStaffProfile.rejected, state => {
                state.loadingPersonal = false;
            })
    }
})

export const { } = personalSlice.actions;
export default personalSlice.reducer;