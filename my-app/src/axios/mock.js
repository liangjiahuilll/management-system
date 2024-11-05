import Mock from 'mockjs'
import homeApi from './mockserverData/home'
import userApi from './mockserverData/user'
import permissionApi from './mockserverData/permission'
Mock.mock(/home\/getData/,homeApi.getStatisticalData)
Mock.mock(/user\/getUser/,userApi.getUserList)

Mock.mock(/user\/addUser/,'post',userApi.createUser)
Mock.mock(/user\/editUser/,'post',userApi.updateUser)
Mock.mock(/user\/deleteUser/,'post',userApi.deleteUser)

Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)
