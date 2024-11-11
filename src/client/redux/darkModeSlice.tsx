import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// User Model
export type DarkModeState = {
	isActive: boolean
}

const slice = createSlice({
  name: 'DARKMODE',
  initialState: {isActive: false} as DarkModeState,
  reducers: {
    set: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state = {
        isActive: action.payload
      }
      return state
    },
    toggle: (
      state,
    ) => {
      state.isActive = !state.isActive
      return state
    },
  },
})

export const DarkModeActions = slice.actions

export default slice.reducer

export const selectDarkMode = (state: RootState) => state.persisted.darkMode
