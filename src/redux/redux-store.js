import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import scheduleReducer from "./schedule";
import patientReducer from './patient';

export const store = configureStore({
    reducer: {
        user: userReducer,
        schedule: scheduleReducer,
        patient: patientReducer
    }
})

