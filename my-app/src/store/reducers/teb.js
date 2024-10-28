import {createSlice} from '@reduxjs/toolkit'

const tebSlice=createSlice({
  name:'teb',
  initialState:{
    isCollapse:false
  },
  reducers:{
    collapseMenu:(state)=>{
      state.isCollapse=!state.isCollapse
    }
  }
})
export const {collapseMenu} = tebSlice.actions
export default tebSlice.reducer