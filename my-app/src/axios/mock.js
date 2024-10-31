import Mock from 'mockjs'
import homeApi from './mockserverData/home'
import userApi from './mockserverData/user'
Mock.mock(/home\/getData/,homeApi.getStatisticalData)
Mock.mock(/user\/getUser/,userApi.getUserList)