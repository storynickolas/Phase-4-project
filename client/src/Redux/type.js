import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTypes = createAsyncThunk("type/fetchTypes", () => {
  // return a Promise containing the data we want
  return  fetch(`http://localhost:4000/styles`)
    .then((response) => response.json())
    .then((data) => data);
});

export const typeSlice = createSlice({
  name: 'type',
  initialState: {
    type: []
  },
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [fetchTypes.pending](state) {
      state.status = "loading";
    },
    [fetchTypes.fulfilled](state, action) {
      state.type = action.payload;
      state.status = "idle";
    },
  }
})

export default typeSlice.reducer