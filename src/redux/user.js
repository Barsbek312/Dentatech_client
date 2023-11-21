import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAPI } from "../API/API";

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
    try {
        const res = await userAPI.getMe();

        if(res.status === 200) {
            return res;
        } else {
            const error = await res.text();
            console.log(error);
            thunkAPI.rejectWithValue(error);
        }
    } catch(err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err);
    }
});

export const getPositions = createAsyncThunk("user/getPosition", async(_, thunkAPI) => {
    try {
        const res = await userAPI.getPositions();

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

export const verifyEmail = createAsyncThunk("user/verify", async(data, thunkAPI) => {
    const body = JSON.stringify(data);

    try {
        const res = await userAPI.verifyEmail(body);
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

export const createUser = createAsyncThunk("user/register", async (data, thunkAPI) => {

    const body = JSON.stringify(data);

    try {
        const res = await userAPI.createUser(body);

        if(res.status === 201) {
            const token = res.data.access_token; 
            document.cookie = `token=${token}; max-age=${2*24*60*60}; path=/`;

            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }

});

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
    const body = JSON.stringify(data);

    try {
        const res = await userAPI.login(body);

        if(res.status === 200) {
            const token = res.data.access_token; 
            document.cookie = `token=${token}; max-age=${2*24*60*60}; path=/`;

            const {dispatch} = thunkAPI;

            const res2 = await dispatch(getUser());

            return res2;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
});


export const createEvent = createAsyncThunk("events/addEvent", async (data, thunkAPI) => {

});

export const getEvents = createAsyncThunk("events/getEvents", async (_, thunkAPI) => {

})

export const deleteEvent = createAsyncThunk("events/deleteEvent", async (eventId, thunkAPI) => {

});



export const updateEvent = createAsyncThunk("events/updateEvent", async (eventData, thunkAPI) => {
});

export const getPersonal = createAsyncThunk("personal/getPersonalAll", async(_, thunkAPI) => {
})



let initialState = {
    user: null,
    loadingUser: false,
    registered: false,
    activated: false,
    isAuth: false,
    status: null,
    positions: null,
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetRegistered: state => {
            state.registered = false;
        },
        logout: state => {
            document.cookie = 'token=; Max-Age=0; path=/';
            state.isAuth = false;
            state.user = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createUser.pending, state => {
                state.loadingUser = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loadingUser = false;
                state.registered = true;
            })
            .addCase(createUser.rejected, state => {
                state.loadingUser = false;
            })
            .addCase(verifyEmail.pending, state => {
                state.loadingUser = true;
            })
            .addCase(verifyEmail.fulfilled, state => {
                state.loadingUser = false;
            })
            .addCase(verifyEmail.rejected, state => {
                state.loadingUser = false;
            })
            .addCase(login.pending, state => {
                state.loadingUser = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loadingUser = false;
                state.isAuth = true;
            })
            .addCase(login.rejected, state => {
                state.loadingUser = false;
            })
            .addCase(getUser.pending, state => {
                state.loadingUser = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loadingUser = false;
                state.user = action?.payload?.data;
                state.isAuth = true;
            }) 
            .addCase(getUser.rejected, state => {
                state.loadingUser = false;
            })
            .addCase(getPositions.pending, state => {
                state.loadingUser = true;
            })
            .addCase(getPositions.fulfilled, (state, action) => {
                state.loadingUser = false;
                state.positions = action.payload.data;
            })
            .addCase(getPositions.rejected, state => {
                state.loadingUser = false;
            })
            .addCase(createEvent.pending, state => {
                state.loadingUser = true;
            })
            .addCase(createEvent.fulfilled, state => {
                state.loadingUser = false;
            })
            .addCase(createEvent.rejected, state => {
                state.loadingUser = false;
            })
            .addCase(getEvents.pending, state => {
                state.loadingUser = true;
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.loadingUser = false;
                console.log(action)
                state.user.events = action.payload.events;
            })
            .addCase(getEvents.rejected, state => {
                state.loadingUser = false;
            })
            .addCase(deleteEvent.pending, state => {
                state.loadingUser = true;
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.loadingUser = false;
                state.user.events = state.user.events.filter(event => event.id !== action.payload);
            })
            .addCase(deleteEvent.rejected, state => {
                state.loadingUser = false;
            })
            .addCase(updateEvent.pending, state => {
                state.loadingUser = true;
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.loadingUser = false;
                const updatedEventIndex = state.user.events.findIndex(event => event.id === action.payload.id);
                if (updatedEventIndex !== -1) {
                    state.user.events[updatedEventIndex] = action.payload;
                }
            })
            .addCase(updateEvent.rejected, state => {
                state.loadingUser = false;
            })
            // .addCase(getPersonal.pending, state => {
            //     state.loadingUser = true;
            // })
            // .addCase(getPersonal.fulfilled, (state, action) => {
            //     state.loadingUser = false;
            //     state.user.personal = action.payload || null;
            // })
            // .addCase(getPersonal.rejected, state => {
            //     state.loadingUser = false;
            // })
    }
})

export const { resetRegistered, logout } = userSlice.actions;
export default userSlice.reducer;