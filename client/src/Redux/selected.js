import {createSlice } from "@reduxjs/toolkit";

export const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    selected: ''
  },
  reducers: {
    changeSelected: (state, action) => {
      state.selected = action.payload
    },
  },
})

export const { changeSelected } = selectedSlice.actions

export default selectedSlice.reducer
