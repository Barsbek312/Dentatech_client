import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    isShowNotification: false,
    isErrorNotification: null,
    notificationText: "",
    notificationTimeout: null,
    clearIsError: null
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        removeNotificationText: state => {
            state.notificationText = ""
        },

        hideNotification: state => {
            state.isShowNotification = false;
        },

        deleteErrorStatus: state => {
            state.isErrorNotification = null;
        },

        showNotification: state => {
            state.isShowNotification = true;
        },

        setErrorNotification: (state, action) => {
            state.isErrorNotification = action.payload;
        },

        setNotificationText: (state, action) => {
            state.notificationText = action.payload;
        }
    }
})

let notificationTimeout;
let clearIsError;

export const removeNotification = (dispatch) => {

    clearTimeout(notificationTimeout);
    clearTimeout(clearIsError);

    notificationTimeout = setTimeout(() => {
        dispatch(hideNotification());
    }, 2000);

    clearIsError = setTimeout(() => {
        dispatch(deleteErrorStatus());
        dispatch(removeNotificationText());
    }, 2200);
}

export const { removeNotificationText, hideNotification, deleteErrorStatus, showNotification, setErrorNotification, setNotificationText } = notificationSlice.actions;
export default notificationSlice.reducer;
