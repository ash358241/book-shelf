import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

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



export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {},
})

export default userSlice.reducer;