import UserContext from '../context/UserContext'
import { useContext } from 'react'

export const SignOut = () => {
    const { setLoggedIn } = useContext(UserContext)
    setLoggedIn(false)
};

export const isEmptyObject = (obj) => {
    return JSON.stringify(obj) === '{}'
}

export const formSubmitHandler = (event) => {
    const formData = new FormData(event.currentTarget);
    const user = {}
    for (let entry of formData.entries()) {
        user[entry[0]] = entry[1]
    }
    return user;
}

const request = ( url, params = {}, method = 'GET' ) => {
    let options = {
        method
    };
    if ( 'GET' === method ) {
        url += '?' + ( new URLSearchParams( params ) ).toString();
    } else {
        options.body = JSON.stringify( params );
    }
    
    return fetch( url, options ).then( response => response.json() );
};

export const get = ( url, params ) => request( url, params, 'GET' );
export const post = ( url, params ) => request( url, params, 'POST' );


