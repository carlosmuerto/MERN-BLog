import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../services/Auth";
import { RootState } from "./store";

type AuthState = User | null

const slice = createSlice({
  name: 'USER',
  initialState: null as AuthState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<User>,
    ) => {
      const user:User = { ...action.payload }
      console.log("action",user)
      state = user
      return state
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.user
