import React from "react";
import MenuConfig from '../../config'
import * as Icon from '@ant-design/icons'
import {  Layout, Menu } from 'antd'
const { Sider } = Layout
const iconToElement=(name)=>{
  return React.createElement(Icon[name])
}
const items=MenuConfig.map((icon)=>{
  const child={
    key:icon.path,
    icon:iconToElement(icon.icon),
    label:icon.label
  }
  if(icon.children){
    child.children=icon.children.map(item=>{
      return {
        key:item.path,
        label:item.label
      }
    })
  }
  return child
})

const CommonAside=({collapsed})=>{
  return (
    <Sider trigger={null} collapsed={collapsed} >
        <h3 className='app-name'>{collapsed?'后台':'通用后台管理系统'}</h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
          style={{
            height:'100%'
          }}
        />
      </Sider>
  )
}
export default CommonAside