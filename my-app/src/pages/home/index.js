import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'antd'
import { Card } from 'antd'
import './home.css'
import {getData} from '../../axios'
import * as Icon from '@ant-design/icons'

// table列的数据
const columns=[
  {
    title:'课程',
    dataIndex:'name'
  },
  {
    title:'今日购买',
    dataIndex:'todayBuy'
  },
  {
    title:'本月购买',
    dataIndex:'monthBuy'
  },
  {
    title:'总购买',
    dataIndex:'totalBuy'
  }
]

const countData = [
  {
    "name": "今日支付订单",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "今日收藏订单",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "今日未支付订单",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  },
  {
    "name": "本月支付订单",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "本月收藏订单",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "本月未支付订单",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  }
]
const iconToElement=(name)=>{
  return React.createElement(Icon[name])
}
const Home = () => {

  useEffect(()=>{
    getData().then(res=>{
      console.log(res.data.data.tableData)
      const {tableData} =res.data.data
      settabData(tableData)
    })
  },[])
  const [tableData,settabData]=useState([])
  const img = require('../../assets/imgs/user-default.png')
  return (
    <div>
      <Row className='home'>
        <Col span={8}>
          <Card hoverable>
            <div className='user'>
              <img src={img}></img>
              <div className='userinfo'>
                <p className='name'>Admin</p>
                <p className='access'>超级管理员</p>
              </div>
            </div>
            <div className='login-info'>
              <p>上次登录时间：<span>2021-7-10</span></p>
              <p>上次登陆地点：<span>武汉</span></p>
            </div>
          </Card>
          <Card>
            <Table dataSource={tableData} rowKey={'name'} columns={columns} pagination={false}></Table>
          </Card>
        </Col>
        <Col span={16}>
          <div className='num'>
            {
              countData.map((item,index)=>{
                return (
                  <Card key={index}>
                    <div className='icon-box' style={{backgroundColor:item.color}}>
                      {iconToElement(item.icon)}
                    </div>
                    <div className='detail'>
                      <p className='nnum'>￥{item.value}</p>
                      <p className='txt'>{item.name}</p>
                    </div>
                  </Card>
                )
              })
            }
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default Home
