import { Button, Form, Input, message } from 'antd'
import React from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { getMenu } from '../../axios'
const Login = () => {
  const navigate=useNavigate()
  const handleSubmit=(val)=>{
    console.log(val)
    if(!val.username||!val.password){
      return message.open({
        type:'waining',
        content:'请输入用户名和密码'
      })
    }
    getMenu(val).then(({data})=>{
      localStorage.setItem('token',data.data.token)
      navigate('/home')
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
        <Button htmlType='submit' type='primary'>登录</Button>
      </Form.Item>
    </Form>
  )
}
export default Login
