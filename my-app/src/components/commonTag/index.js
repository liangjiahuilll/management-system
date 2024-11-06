import { Space, Tag } from 'antd'
import React from 'react'
import './commonTag.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  closeTag,
  selectMenuList,
  setCurrentMenu,
} from '../../store/reducers/teb'
import { useNavigate } from 'react-router-dom'

const CommonTag = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const tabsList = useSelector((state) => state.teb.tabList)
  const currentMenu = useSelector((state) => state.teb.currentMenu)

  const handcloseTag = (item, index) => {
    dispatch(closeTag(item))
    if (index === tabsList.length - 1) {
      dispatch(setCurrentMenu(tabsList[index - 1]))
      navigate(tabsList[index - 1].path)
    } else {
      if (tabsList.length >= 1) {
        dispatch(setCurrentMenu(tabsList[index + 1]))
        navigate(tabsList[index + 1].path)
      }
    }
  }

  const handChange = (item) => {
    dispatch(setCurrentMenu(item))
    navigate(item.path)
  }
  const setTag = (flag, item, index) => {
    console.log(item)
    return flag ? (
      <Tag
        color="#55acee"
        closeIcon
        onClose={() => handcloseTag(item, index)}
        key={item.name}
      >
        {item.label}
      </Tag>
    ) : (
      <Tag key={item.name} onClick={() => handChange(item)}>
        {item.label}
      </Tag>
    )
  }
  return (
    <Space className="common-tag" size={[0, 8]} wrap>
      {/* <Tag>
          首页
        </Tag>
        <Tag color="#55acee" closeIcon onClose={closeTag}>
          用户列表
        </Tag> */}
      {
        //判断是否为当前选中tab
        currentMenu.name &&
          tabsList.map((item, index) =>
            setTag(item.path === currentMenu.path, item, index)
          )
      }
    </Space>
  )
}
export default CommonTag
