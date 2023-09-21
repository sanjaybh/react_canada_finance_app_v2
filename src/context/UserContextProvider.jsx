import UserContext from './UserContext'
import {useState} from 'react';

const UserContextProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false)
    return (
        <UserContext.Provider value={{loggedIn, setLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;