import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { diseaseAPI } from "../API/API";

export const getDisease = createAsyncThunk("disease/get-disease", async (clinicId, thunkAPI) => {
    try {
        const res = await diseaseAPI.getDisease(clinicId);
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

export const createDisease = createAsyncThunk("disease/create-disease", async (data, thunkAPI) => {
    const body = JSON.stringify(data);
    try {
        const res = await diseaseAPI.createDisease(body);

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

export const editDiagnosis = createAsyncThunk("disease/edit-diagnosis", async (data, thunkAPI) => {
    const { id, ...restData } = data;
    const body = JSON.stringify(restData);

    try {
        const res = await diseaseAPI.editDiagnosis(id, body);

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

export const deleteDiagnosis = createAsyncThunk("disease/delete-diagnosis", async (diagnosisId, thunkAPI) => {
    try {
        const res = await diseaseAPI.deleteDiagnosis(diagnosisId);

        if (res.status === 200) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch (err) {
        return thunkAPI.createAsyncThunk(err);
    }
})

let initialState = {
    loadingDisease: false,
    disease: null
}

const diseaseSlice = createSlice({
    name: "disease",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getDisease.pending, state => {
                state.loadingDisease = true;
            })
            .addCase(getDisease.fulfilled, (state, action) => {
                state.loadingDisease = false;
                state.disease = action.payload.data;
            })
            .addCase(getDisease.rejected, state => {
                state.loadingDisease = false;
            })
            .addCase(createDisease.pending, state => {
                state.loadingDisease = true;
            })
            .addCase(createDisease.fulfilled, (state, action) => {
                state.loadingDisease = false;
                if (state.disease) {
                    state.disease = [...state.disease, action.payload.data];
                } else {
                    state.disease = [action.payload.data];
                }
            })
            .addCase(createDisease.rejected, state => {
                state.loadingDisease = false;
            })
            .addCase(editDiagnosis.pending, state => {
                state.loadingDisease = true;
            })
            .addCase(editDiagnosis.fulfilled, (state, action) => {
                state.loadingDisease = false;
            })
            .addCase(editDiagnosis.rejected, state => {
                state.loadingDisease = false;
            })
            .addCase(deleteDiagnosis.pending, state => {
                state.loadingDisease = true;
            })
            .addCase(deleteDiagnosis.fulfilled, (state, action) => {
                state.loadingDisease = false;
            })
            .addCase(deleteDiagnosis.rejected, state => {
                state.loadingDisease = false;
            })

    }
})

export const { } = diseaseSlice.actions;
export default diseaseSlice.reducer;