import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { templateAPI } from "../API/API";

export const getPatientToothTemplateHistory = createAsyncThunk('template/get-patient-tooth-template-history', async (data, thunkAPI) => {
    const { patientId, toothId } = data;

    try {
        const res = await templateAPI.getTemplateHistory({ patientId, toothId })

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

export const getTemplateType = createAsyncThunk('template/get-template-type', async (_, thunkAPI) => {
    try {
        const res = await templateAPI.getTemplateType();

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

export const getTemplateListByTemplateType = createAsyncThunk('template/get-template-list-by-template-type', async (templateTypeId, thunkAPI) => {
    try {
        const res = await templateAPI.getTemplateListByType(templateTypeId);

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

export const createTemplateHistory = createAsyncThunk('template/create-template-history', async (data, thunkAPI) => {
    const body = JSON.stringify(data);

    try {
        const res = await templateAPI.createTemplateHistory(body);

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
    loadingTemplate: false,
    templateHistory: null,
    templateType: null,
    templateList: null
}

const templateReducer = createSlice({
    name: "template",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getPatientToothTemplateHistory.pending, state => {
                state.loadingTemplate = true;
            })
            .addCase(getPatientToothTemplateHistory.fulfilled, (state, action) => {
                state.loadingTemplate = false;
                state.templateHistory = action.payload.data;
            })
            .addCase(getPatientToothTemplateHistory.rejected, state => {
                state.loadingTemplate = false;
            })
            .addCase(getTemplateType.pending, state => {
                state.loadingTemplate = true;
            })
            .addCase(getTemplateType.fulfilled, (state, action) => {
                state.loadingTemplate = false;
                state.templateType = action.payload.data;
            })
            .addCase(getTemplateType.rejected, state => {
                state.loadingTemplate = false;
            })
            .addCase(getTemplateListByTemplateType.pending, state => {
                state.loadingTemplate = true;
            })
            .addCase(getTemplateListByTemplateType.fulfilled, (state, action) => {
                state.loadingTemplate = false;
                state.templateList = action.payload.data;
            })
            .addCase(getTemplateListByTemplateType.rejected, state => {
                state.loadingTemplate = false;
            })
            .addCase(createTemplateHistory.pending, state => {
                state.loadingTemplate = true;
            })
            .addCase(createTemplateHistory.fulfilled, (state, action) => {
                state.loadingTemplate = false;
                if (state.templateHistory) {
                    state.templateHistory = [...state.templateHistory, action.payload.data];
                } else {
                    state.templateHistory = [action.payload.data];
                }
            })
            .addCase(createTemplateHistory.rejected, state => {
                state.loadingTemplate = false;
            })
    }
})

export const { } = templateReducer.actions
export default templateReducer.reducer