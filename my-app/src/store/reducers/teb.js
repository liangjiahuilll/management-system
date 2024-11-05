import {createSlice, current} from '@reduxjs/toolkit'

const tebSlice=createSlice({
  name:'teb',
  initialState:{
    isCollapse:false,
    tabList:[
      {
        path:'/',
        name:'/home',
        label:'首页'
      }
    ],
    currentMenu:{}
  },
  reducers:{
    collapseMenu:(state)=>{
      state.isCollapse=!state.isCollapse
    },
    // 定义tab列表数据
    selectMenuList:(state,{payload:val})=>{
      if(val.name!=='home'){
        state.currentMenu=val
        const result=state.tabList.findIndex(item=>{
          return item.name===val.name
        })
        if(result===-1){
          state.tabList.push(val)
        }
      }else if(val.name==='home'&&state.tabList.length===1){
        state.currentMenu={}
      }
    },

    closeTag:(state,{payload:val})=>{
      let res=state.tabList.findIndex(item=>item.name===val.name)
      state.tabList.splice(res,1)
    },

    setCurrentMenu:(state,{payload:val})=>{
      if(val.name==='home'){
        state.currentMenu={}
      }else{
        state.currentMenu=val
      }
    }
  }
})
export const {collapseMenu,selectMenuList,closeTag,setCurrentMenu} = tebSlice.actions
export default tebSlice.reducer