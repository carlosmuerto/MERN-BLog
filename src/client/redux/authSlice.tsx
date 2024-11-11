import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { jwtDecode } from "jwt-decode";

// User Model
export type User = {
  id: string;
  username: string;
  email: string;
  profileImg: string | null;
}

export type AuthState = User & {token: string} | null

const slice = createSlice({
  name: 'USER',
  initialState: null as AuthState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<string>,
    ) => {
      const decoded = jwtDecode<User>(action.payload)
      const user:User = decoded
      state = {
        token: action.payload,
        ...user
      }
      return state
    },
    removeCredentials: (
      state,
    ) => {
      state = null
      return state
    },
  },
})

export const { setCredentials, removeCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.persisted.user
