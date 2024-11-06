import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectMenu } from '../store/reducers/teb'

export const RouterAuth = ({ children }) => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  console.log(token)
  if (!token) {
    return <Navigate to="/login" replace />
  }
  let menu = localStorage.getItem('menu')
  console.log(JSON.parse(menu))
  dispatch(selectMenu(JSON.parse(menu)))
  return children
}
