import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { procedureAPI } from "../API/API";

export const getProcedureType = createAsyncThunk('procedure/getProcedureType', async (_, thunkAPI) => {
    try {
        const res = await procedureAPI.getProcedureType();
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

export const getAllProcedureByClinicId = createAsyncThunk('procedure/getAllProcedure', async (clinicId, thunkAPI) => {
    try {
        const res = await procedureAPI.getAllProcedure(clinicId);

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

export const createProcedure = createAsyncThunk('procedure/createProcedure', async (data, thunkAPI) => {
    const body = JSON.stringify(data);

    try {
        const res = await procedureAPI.createProcedure(body);

        if (res.status === 201) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.createAsyncThunk(error);
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const deletePlannedProcedure = createAsyncThunk('procedure/delete-planned-procedure', async (plannedProcedureId, thunkAPI) => {
    try {
        const res = await procedureAPI.deletePlannedProcedure(plannedProcedureId);

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

export const editPlannedProcedure = createAsyncThunk('procedure/edit-planned-procedure', async (data, thunkAPI) => {
    const { id, ...restData } = data;
    const body = JSON.stringify(restData);

    try {
        const res = await procedureAPI.editPlannedProcedure(id, body);

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

export const createTreatmentPlan = createAsyncThunk('procedure/createTreatmentPlan', async (data, thunkAPI) => {
    const body = JSON.stringify(data);

    try {
        const res = await procedureAPI.createTreatmentPlan(body);

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

export const getPatientTreatmentPlan = createAsyncThunk('procedure/getPatientTreatmentPlan', async ({ patientId, toothId }, thunkAPI) => {
    try {
        const res = await procedureAPI.getPatientTreatmentPlan(patientId, toothId);

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

export const createCompletedProcedure = createAsyncThunk('procedure/createCompletedProcedure', async (data, thunkAPI) => {
    const body = JSON.stringify(data);

    try {
        const res = await procedureAPI.createCompletedProcedure(body);

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

export const getCompletedProcedure = createAsyncThunk('procedure/getCompeletedProcedure', async ({ receptionId, toothId }, thunkAPI) => {
    try {
        const res = await procedureAPI.getCompletedProcedure(receptionId, toothId);

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

export const deleteCompletedProcedure = createAsyncThunk('procedure/deleteCompletedProcedure', async (diseaseHistoryId, thunkAPI) => {
    try {
        const res = await procedureAPI.deleteCompletedProcedure(diseaseHistoryId);

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

export const editCompletedProcedure = createAsyncThunk('procedure/editCompletedProcedure', async (data, thunkAPI) => {
    const { id, ...restData } = data;
    const body = JSON.stringify(restData);

    try {
        const res = await procedureAPI.editCompletedProcedure(id, body);

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
    loadingProcedure: false,
    procedure: null,
    procedureType: null,
    treatmentPlan: null,
    medicalHistory: null
}

const procedureSlice = createSlice({
    name: "procedure",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getProcedureType.pending, state => {
                state.loadingProcedure = true;
            })
            .addCase(getProcedureType.fulfilled, (state, action) => {
                state.loadingProcedure = false;
                state.procedureType = action.payload.data;
            })
            .addCase(getProcedureType.rejected, state => {
                state.loadingProcedure = false;
            })
            .addCase(getAllProcedureByClinicId.pending, state => {
                state.loadingProcedure = true;
            })
            .addCase(getAllProcedureByClinicId.fulfilled, (state, action) => {
                state.loadingProcedure = false;
                state.procedure = action.payload.data;
            })
            .addCase(getAllProcedureByClinicId.rejected, state => {
                state.loadingProcedure = false;
            })
            .addCase(createProcedure.pending, state => {
                state.loadingProcedure = true;
            })
            .addCase(createProcedure.fulfilled, (state, action) => {
                state.loadingProcedure = false;
                state.procedure = [...state.procedure, action.payload.data];
            })
            .addCase(createProcedure.rejected, state => {
                state.loadingProcedure = false;
            })
            .addCase(createTreatmentPlan.pending, state => {
                state.loadingProcedure = true;
            })
            .addCase(createTreatmentPlan.fulfilled, (state, action) => {
                state.loadingProcedure = false;
            })
            .addCase(createTreatmentPlan.rejected, state => {
                state.loadingProcedure = false;
            })
            .addCase(getPatientTreatmentPlan.pending, state => {
                state.loadingProcedure = true;
            })
            .addCase(getPatientTreatmentPlan.fulfilled, (state, action) => {
                state.loadingProcedure = false;
                state.treatmentPlan = action.payload.data;
            })
            .addCase(getPatientTreatmentPlan.rejected, state => {
                state.loadingProcedure = false;
            })
            .addCase(deletePlannedProcedure.pending, state => {
                state.loadingProcedure = true;
            })
            .addCase(deletePlannedProcedure.fulfilled, (state, action) => {
                state.loadingProcedure = false;
            })
            .addCase(deletePlannedProcedure.rejected, state => {
                state.loadingDisease = false;
            })
            .addCase(editPlannedProcedure.pending, state => {
                state.loadingProcedure = true;
            })
            .addCase(editPlannedProcedure.fulfilled, (state, action) => {
                state.loadingProcedure = false;
            })
            .addCase(editPlannedProcedure.rejected, state => {
                state.loadingProcedure = false;
            })
            .addCase(createCompletedProcedure.pending, state => {
                state.loadingProcedure = true;
            })
            .addCase(createCompletedProcedure.fulfilled, (state, action) => {
                state.loadingProcedure = false;
                if (state.medicalHistory) {
                    state.medicalHistory = [...state.medicalHistory, action.payload.data];
                } else {
                    state.medicalHistory = [action.payload.data];
                }
            })
            .addCase(createCompletedProcedure.rejected, state => {
                state.loadingProcedure = false;
            })
            .addCase(getCompletedProcedure.pending, state => {
                state.loadingProcedure = true;
            })
            .addCase(getCompletedProcedure.fulfilled, (state, action) => {
                state.loadingProcedure = false;
                state.medicalHistory = action.payload.data;
            })
            .addCase(getCompletedProcedure.rejected, state => {
                state.loadingProcedure = false;
            })
            .addCase(deleteCompletedProcedure.pending, state => {
                state.loadingProcedure = true;
            })
            .addCase(deleteCompletedProcedure.fulfilled, (state, action) => {
                state.loadingProcedure = false;
                state.medicalHistory = state.medicalHistory && state.medicalHistory[0] && state.medicalHistory[0].teethPartConnectId && state.medicalHistory[0].teethPartConnectId.map(toothPart => {
                    toothPart.medicalHistory = toothPart.medicalHistory.filter(item => item.id !== action.payload.data);
                    return toothPart;
                })
            })
            .addCase(deleteCompletedProcedure.rejected, state => {
                state.loadingProcedure = false;
            })
            .addCase(editCompletedProcedure.pending, state => {
                state.loadingProcedure = true;
            })
            .addCase(editCompletedProcedure.fulfilled, (state, action) => {
                state.loadingProcedure = false;
            })
            .addCase(editCompletedProcedure.rejected, state => {
                state.loadingProcedure = false;
            })
    }
})

export const { } = procedureSlice.actions;
export default procedureSlice.reducer