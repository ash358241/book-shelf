import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../../../lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

interface IUser {
    user: {
        email: string | null
    },
    isLoading: boolean,
    isError: boolean,
    error: string | null
}

interface ICredentials {
    email: string,
    password: string
}

const initialState: IUser = {
    user: {
        email: null,
    },
    isLoading: false,
    isError: false,
    error: null
}

export const createUser = createAsyncThunk(
    'user/createUser',
    async ({email, password}: ICredentials) => {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        return data.user.email;
    }
)

export const loggedInUser = createAsyncThunk(
    'user/loggedInUser',
    async ({email, password}: ICredentials) => {
        const data = await signInWithEmailAndPassword(auth, email, password);
        return data.user.email;
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true,
            state.isError = false,
            state.error = null
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
            state.user.email = action.payload
        })
        .addCase(createUser.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true,
            state.error = action.error.message!
        })
        .addCase(loggedInUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
          })
          .addCase(loggedInUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.user.email = action.payload;
          })
          .addCase(loggedInUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message!;
          });
    },
})

export default userSlice.reducer;