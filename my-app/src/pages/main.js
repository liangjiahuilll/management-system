// import React from 'react'
// import { Outlet } from 'react-router-dom'
import React, { useEffect } from 'react'
import { Button, Layout,  theme } from 'antd'
import CommonAside from '../components/commonAside'
import CommonHeader from '../components/commonHeader'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import {getData} from '../axios'


const { Header,  Content } = Layout

const Main = () => {
  const collapsed=useSelector(state=>state.teb.isCollapse)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  return (
    <Layout className='main-container'>
      <CommonAside collapsed={collapsed}></CommonAside>
      <Layout>
        <CommonHeader collapsed={collapsed}></CommonHeader>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}
export default Main
