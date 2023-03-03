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
    cow: 3,
    type: []
  },
  // reducers: {
  //   catAdded(state, action) {
  //     // using createSlice lets us mutate state!
  //     state.beers.push(action.payload);
  //   },
  //   catUpdated(state, action) {
  //     const cat = state.beers.find((cat) => cat.id === action.payload.id);
  //     cat.url = action.payload.url;
  //   },
  // },
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

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = typeSlice.actions

export default typeSlice.reducer