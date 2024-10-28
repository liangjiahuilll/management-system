import { configureStore } from "@reduxjs/toolkit";
import tebReducer from './reducers/teb'

const store=configureStore({
  reducer:{
    teb:tebReducer
  }
})
export default store