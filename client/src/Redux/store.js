import { configureStore } from '@reduxjs/toolkit'
import brewsReducer from './brews'
import typeReducer from './type'

export const store = configureStore({
  reducer: {
    brew: brewsReducer,
    type: typeReducer
  },
})

