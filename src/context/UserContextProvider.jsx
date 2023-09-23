import UserContext from './UserContext'
import {useState} from 'react';

const UserContextProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState()
    return (
        <UserContext.Provider value={{loggedIn, setLoggedIn, loggedInUser, setLoggedInUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;