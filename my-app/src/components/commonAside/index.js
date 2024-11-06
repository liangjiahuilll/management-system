import React from 'react'
// import MenuConfig from '../../config'
import * as Icon from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { selectMenuList } from '../../store/reducers/teb'
import { useDispatch, useSelector } from 'react-redux'

const CommonAside = ({ collapsed }) => {
  const MenuConfig = useSelector((state) => state.teb.selectMenu)
  console.log(MenuConfig)
  const { Sider } = Layout
  const iconToElement = (name) => {
    return React.createElement(Icon[name])
  }
  const items = MenuConfig.map((icon) => {
    const child = {
      key: icon.path,
      icon: iconToElement(icon.icon),
      label: icon.label,
    }
    if (icon.children) {
      child.children = icon.children.map((item) => {
        return {
          key: item.path,
          label: item.label,
        }
      })
    }
    return child
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const setTabList = (val) => {
    dispatch(selectMenuList(val))
  }
  // 点击菜单
  const selectMenu = (e) => {
    console.log(e.keyPath)
    let data
    MenuConfig.forEach((item) => {
      // 找到当前数据
      if (item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item
        // 如果有二级菜单
        if (e.keyPath.length > 1) {
          data = item.children.find((child) => {
            return child.path === e.key
          })
        }
      }
    })
    setTabList({
      path: data.path,
      name: data.name,
      label: data.label,
    })
    navigate(e.key)
  }
  return (
    <Sider trigger={null} collapsed={collapsed}>
      <h3 className="app-name">{collapsed ? '后台' : '通用后台管理系统'}</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
        style={{
          height: '100%',
        }}
        onClick={selectMenu}
      />
    </Sider>
  )
}
export default CommonAside
