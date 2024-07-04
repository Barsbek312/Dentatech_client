import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import scheduleReducer from "./schedule";
import patientReducer from './patient';
import branchReducer from './branch';
import personalReducer from './personal';
import toothReducer from './tooth';
import diseaseReducer from './disease';
import procedureReducer from './procedure';
import notificationReducer from './notification';
import billReducer from './bill';
import diseaseHistoryReducer from './disease-history';
import templateReducer from './template'

export const store = configureStore({
    reducer: {
        user: userReducer,
        schedule: scheduleReducer,
        patient: patientReducer,
        branch: branchReducer,
        personal: personalReducer,
        tooth: toothReducer,
        disease: diseaseReducer,
        procedure: procedureReducer,
        notification: notificationReducer,
        bill: billReducer,
        diseaseHistory: diseaseHistoryReducer,
        template: templateReducer
    }
})

