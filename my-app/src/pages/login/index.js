import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import './login.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { getMenu } from '../../axios'
import { selectMenu } from '../../store/reducers/teb'
import { useDispatch } from 'react-redux'
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  if (localStorage.getItem('token')) {
    return <Navigate to="/home" replace />
  }

  const handleSubmit = (val) => {
    console.log(val)
    if (!val.username || !val.password) {
      return message.open({
        type: 'warning',
        content: '请输入用户名和密码',
      })
    }
    getMenu(val).then(({ data }) => {
      console.log(data)
      if (data.code === -999) {
        message.open({
          type: 'error',
          content: '密码错误',
        })
      } else {
        dispatch(selectMenu(data.data.menu))
        localStorage.setItem('token', data.data.token)
        navigate('/home')
      }
    })
  }
  return (
    <Form className="login-container" onFinish={handleSubmit}>
      <div className="login_title">系统登录</div>
      <Form.Item label="账号" name="username">
        <Input placeholder="请输入账号"></Input>
      </Form.Item>
      <Form.Item label="密码" name="password">
        <Input.Password placeholder="请输入密码"></Input.Password>
      </Form.Item>
      <Form.Item className="login-button">
        <Button htmlType="submit" type="primary">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
export default Login
