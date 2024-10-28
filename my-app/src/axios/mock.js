import Mock from 'mockjs'
import homeApi from './mockserverData/home'
Mock.mock(/home\/getData/,homeApi.getStatisticalData)