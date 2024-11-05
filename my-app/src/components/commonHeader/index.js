import React from 'react'
import './commonHeader.css'
import { Button, Layout, Avatar, Dropdown } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { collapseMenu } from '../../store/reducers/teb'
import { useNavigate } from 'react-router-dom'
const { Header, Content } = Layout

const CommonHeader = ({collapsed}) => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const setcollapsed=()=>{
    dispatch(collapseMenu(collapsed))
  }
  // 退出登录
  const logout=()=>{
    // 清除token
    localStorage.removeItem('token')
    navigate('/login')
  }
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer">
          个人主页
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={logout}>
          退出
        </a>
      ),
    },
  ]
  return (
    <div>
      <Header className="header-container">
        <Button
          type="text"
          icon={<MenuFoldOutlined />}
          style={{
            fontSize: '16px',
            width: 64,
            height: 32,
            backgroundColor: '#fff',
          }}
          onClick={setcollapsed}
        />
        <Dropdown
          menu={{
            items,
          }}
        >
          <Avatar
            src={<img src={require('../../assets/imgs/user-default.png')} />}
            // src={<img src={'../../assets/imgs/user-default.png'} />}
          />
        </Dropdown>
      </Header>
    </div>
  )
}
export default CommonHeader
