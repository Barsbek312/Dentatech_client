import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { branchAPI } from "../API/API";

export const getBranchesByClinicId = createAsyncThunk("branch/getBranches", async (clinicId, thunkAPI) => {
    try {
        const res = await branchAPI.getBranches(clinicId);
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

export const createBranch = createAsyncThunk('branch/create-branch', async (data, thunkAPI) => {
    const body = JSON.stringify(data);
    try {
        const res = await branchAPI.createBranch(body);

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

let initialState = {
    loadingBranch: false,
    branches: null,
    clinic: null
}

const branchSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getBranchesByClinicId.pending, state => {
                state.loadingBranch = true;
            })
            .addCase(getBranchesByClinicId.fulfilled, (state, action) => {
                state.loadingBranch = false;
                state.clinic = action?.payload?.data?.pop();
                state.branches = action?.payload?.data || null;

            })
            .addCase(getBranchesByClinicId.rejected, state => {
                state.loadingBranch = false;
            })
            .addCase(createBranch.pending, state => {
                state.loadingBranch = true;
            })
            .addCase(createBranch.fulfilled, (state, action) => {
                state.loadingBranch = false;
            })
            .addCase(createBranch.rejected, state => {
                state.loadingBranch = false;
            })

    }
})

export const { } = branchSlice.actions;
export default branchSlice.reducer;