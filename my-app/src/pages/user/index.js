import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { Form, Input, Table, Popconfirm, Modal } from 'antd'
import { getUser } from '../../axios'
import './user.css'


const User = () => {
  const [listData, setlistData] = useState({
    name: '',
  })
  const [tableData, settableData] = useState([])
  const [modalType,setModaltype]=useState(0)
  const [isModalOpen,setIsModalOpen]=useState(false)


  const handleClick = (type,rowData) => {
    setIsModalOpen(!isModalOpen)
    if(type==='add'){
      setModaltype(0)
    }else{
      setModaltype(1)
    }
  }


  const handleFinish = (e) => {
    setlistData({
      name: e.name,
    })
    console.log(e.name)
  }


  const getTableData = () => {
    getUser(listData).then((res) => {
      console.log(res.data.list)
      settableData(res.data.list)
    })
  }


  const handleDlete = (rowData) => {}
  const handleOk=()=>{

  }
  const headleCancel=()=>{
    setIsModalOpen(false)
  }
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: (val) => {
        return val ? '女' : '男'
      },
    },
    {
      title: '出生日期',
      dataIndex: 'birth',
    },
    {
      title: '地址',
      dataIndex: 'addr',
    },
    {
      title: '操作',
      render: () => {
        return (
          <div>
            <Button
              style={{ marginRight: '5px' }}
              onClick={() => handleClick('edit')}
            >
              编辑
            </Button>
            <Popconfirm
              title="提示"
              description="此操作将删除用户，是否继续？"
              okText="确认"
              cancelText="取消"
              onCancel={() => handleDlete()}
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        )
      },
    },
  ]
  useEffect(() => {
    getTableData()
  }, [])
  return (
    <div className="user">
      <div className="flex-box">
        <Button type="primary" onClick={()=>handleClick('add')}>
          +新增
        </Button>
        <Form layout="inline" onFinish={handleFinish}>
          <Form.Item name="keyword">
            <Input placeholder="请输入用户名"></Input>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table columns={columns} dataSource={tableData} rowKey={'id'}></Table>
      <Modal
        open={isModalOpen}
        title={modalType ? '编辑用户' : '新增用户'}
        onOk={handleOk}
        onCancel={headleCancel}
        okText="确定"
        cancelText="取消"
      ></Modal>
    </div>
  )
}
export default User
