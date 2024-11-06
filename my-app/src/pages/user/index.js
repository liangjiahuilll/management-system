import React, { useEffect, useState } from 'react'
import { Button, DatePicker, InputNumber, Select } from 'antd'
import { Form, Input, Table, Popconfirm, Modal } from 'antd'
import { getUser, editUser, addUser, deleteUser } from '../../axios'
import dayjs from 'dayjs'
import './user.css'

const User = () => {
  const [form] = Form.useForm()
  const [listData, setlistData] = useState({
    name: '',
  })
  const [tableData, settableData] = useState([])
  const [modalType, setModaltype] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchForm] = Form.useForm()

  // 弹窗类型
  const handleClick = (type, rowData) => {
    setIsModalOpen(!isModalOpen)
    if (type === 'add') {
      setModaltype(0)
    } else {
      setModaltype(1)
      const cloneData = JSON.parse(JSON.stringify(rowData)) //深拷贝
      cloneData.birth = dayjs(cloneData.birth)
      // 表单数据回填
      form.setFieldsValue(cloneData)
    }
  }

  // 搜索
  const handleFinish = (e) => {
    setlistData({
      name: e.keyword,
    })
    console.log(e.keyword)
    console.log(listData)
  }
  console.log(listData)
  useEffect(() => {
    getTableData()
  }, [listData])

  const handleDlete = ({ id }) => {
    deleteUser({ id }).then(() => {
      getTableData()
    })
  }

  const getTableData = () => {
    getUser(listData)
      .then(({ data }) => {
        console.log(data.list)
        settableData(data.list)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 弹窗确认
  const handleOk = () => {
    form.validateFields().then((val) => {
      console.log(val)
      val.birth = dayjs(val.birth).format('YYYY-MM-DD')
      // 编辑
      if (modalType) {
        editUser(val).then(() => {
          // 取消弹窗
          headleCancel()
          // 更新列表接口
          getTableData()
        })
      } else {
        addUser(val).then(() => {
          // 取消弹窗
          headleCancel()
          // 更新列表接口
          getTableData()
        })
      }
    })
  }
  // 弹窗取消
  const headleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
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
      render: (rowData) => {
        return (
          <div>
            <Button
              style={{ marginRight: '5px' }}
              onClick={() => handleClick('edit', rowData)}
            >
              编辑
            </Button>
            <Popconfirm
              title="提示"
              description="此操作将删除用户，是否继续？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => handleDlete(rowData)}
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
        <Button type="primary" onClick={() => handleClick('add')}>
          +新增
        </Button>
        <Form layout="inline" onFinish={handleFinish} form={searchForm}>
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
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} form={form}>
          {modalType === 1 && (
            <Form.Item name="id" hidden>
              <Input></Input>
            </Form.Item>
          )}
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名"></Input>
          </Form.Item>
          <Form.Item
            label="年龄"
            name="age"
            rules={[
              { required: true, message: '请输入年龄' },
              { type: 'number', message: '年龄必须是数字' },
            ]}
          >
            <InputNumber placeholder="请输入年龄"></InputNumber>
          </Form.Item>
          <Form.Item
            label="性别"
            name="sex"
            rules={[{ required: true, message: '请输入性别' }]}
          >
            <Select
              options={[
                { value: 0, label: '男' },
                { value: 1, label: '女' },
              ]}
              placeholder="请选择性别"
            ></Select>
          </Form.Item>
          <Form.Item
            label="出生日期"
            name="birth"
            rules={[{ required: true, message: '请选择出生日期' }]}
          >
            <DatePicker placeholder="请选择" format={'YYYY/MM/DD'}></DatePicker>
          </Form.Item>
          <Form.Item
            label="地址"
            name="addr"
            rules={[{ required: true, message: '请填写地址' }]}
          >
            <Input placeholder="请填写地址"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default User
