import Login from '../Login/Login';
import UserContext from '../../context/UserContext'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'

function User() {
  const { loggedIn, loggedInUser } = useContext(UserContext)
  const {userid} = useParams()

  if(!loggedIn) return <Login />
  
  return (
    <div className='bg-gray-600 text-white text-3xl p-4'>
      User: {userid} <br />
      UserDetails: {loggedInUser.email}
    </div>
  )
}

export default User