import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBrews = createAsyncThunk("brew/fetchBrews", () => {
  // return a Promise containing the data we want
  return  fetch(`http://localhost:4000/beers`)
    .then((response) => response.json())
    .then((data) => data);
});



export const brewsSlice = createSlice({
  name: 'brew',
  initialState: {
    beers: []
  },

  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [fetchBrews.pending](state) {
      state.status = "loading";
    },
    [fetchBrews.fulfilled](state, action) {
      state.beers = action.payload;
      state.status = "idle";
    },
  }
})

export default brewsSlice.reducer