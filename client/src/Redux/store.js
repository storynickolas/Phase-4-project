import { configureStore } from '@reduxjs/toolkit'
import brewsReducer from './brews'
import typeReducer from './type'
import selectedReducer from './selected'

export const store = configureStore({
  reducer: {
    brew: brewsReducer,
    type: typeReducer,
    selected: selectedReducer
  },
})

