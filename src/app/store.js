import { configureStore } from '@reduxjs/toolkit'
import SliceReducer from '../features/Slice'
export const store = configureStore({
  reducer: {
    appStates:SliceReducer
  },
})