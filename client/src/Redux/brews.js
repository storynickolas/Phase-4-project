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
  reducers: {
    add: (state, action) => {
      const newBeers = state.beers
      newBeers[action.payload.beer_id - 1].reviews.push(action.payload)
      state.beers = newBeers
    }
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

export const { add } = brewsSlice.actions

export default brewsSlice.reducer