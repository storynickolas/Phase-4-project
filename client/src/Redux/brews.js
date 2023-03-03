import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBrews = createAsyncThunk("counter/fetchBrews", () => {
  // return a Promise containing the data we want
  return  fetch(`http://localhost:4000/beers`)
    .then((response) => response.json())
    .then((data) => data);
});



export const brewsSlice = createSlice({
  name: 'brew',
  initialState: {
    count: 3,
    beers: []
  },
  // reducers: {
  //   increment: (state) => {
  //     state.count += 1
  //   },
  //   decrement: (state) => {
  //     state.count -= 1
  //   },
  //   incrementByAmount: (state, action) => {
  //     state.value += action.payload
  //   },
  // },
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

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = brewsSlice.actions

export default brewsSlice.reducer