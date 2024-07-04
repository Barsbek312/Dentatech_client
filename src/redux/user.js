import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAPI } from "../API/API";

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
    try {
        const res = await userAPI.getMe();

        if (res.status === 200) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const getPositions = createAsyncThunk("user/getPosition", async (_, thunkAPI) => {
    try {
        const res = await userAPI.getPositions();

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

export const getCity = createAsyncThunk("user/getCity", async (_, thunkAPI) => {
    try {
        const res = await userAPI.getCities();

        if (res.status === 200) {
            return res;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error)
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})

export const verifyEmail = createAsyncThunk("user/verify", async (data, thunkAPI) => {
    const body = JSON.stringify(data);

    try {
        const res = await userAPI.verifyEmail(body);
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

export const createUser = createAsyncThunk("user/register", async (data, thunkAPI) => {
    const { isRegister, ...restData } = data;
    const body = JSON.stringify(restData);


    try {
        const res = await userAPI.createUser(body);

        if (res.status === 201) {
            if (isRegister) {
                const token = res.data.access_token;
                document.cookie = `token=${token}; max-age=${2 * 24 * 60 * 60}; path=/`;
            }

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

        if (res.status === 200) {
            const access_token = res.data.access_token;
            document.cookie = `token=${access_token}; max-age=${2 * 24 * 60 * 60}; path=/`;

            const { dispatch } = thunkAPI;

            const res2 = await dispatch(getUser());

            return res2;
        } else {
            const error = await res.text();
            return thunkAPI.rejectWithValue(error);
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const changePassword = createAsyncThunk("user/changePassowrd", async ({ id, data }, thunkAPI) => {
    const body = JSON.stringify(data)

    try {
        const res = await userAPI.changePassword(id, body);

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
    user: null,
    loadingUser: false,
    registered: false,
    activated: false,
    isAuth: false,
    status: null,
    positions: null,
    city: null
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
            .addCase(getCity.pending, state => {
                state.loadingUser = true;
            })
            .addCase(getCity.fulfilled, (state, action) => {
                state.loadingUser = false;
                state.city = action?.payload?.data;
            })
            .addCase(getCity.rejected, state => {
                state.loadingUser = false;
            })
            .addCase(changePassword.pending, state => {
                state.loadingUser = true;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.loadingUser = false;
            })
            .addCase(changePassword.rejected, state => {
                state.loadingUser = false;
            })
    }
})

export const { resetRegistered, logout } = userSlice.actions;
export default userSlice.reducer;