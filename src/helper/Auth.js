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

const request = ( url, params = {}, method = 'GET') => { 
    let options = {
        method
    };
    if ( 'GET' === method ) {
        url += '?' + ( new URLSearchParams( params ) ).toString();
    } else {
        if(params.accessToken){
            options.headers = { 'Content-Type': 'application/json', "Authorization" : `Bearer ${params.accessToken}`}
        }else{
            options.headers = { 'Content-Type': 'application/json' }
        }        
        options.body = JSON.stringify( params );
    }
    
    return fetch( url, options ).then( response => response.json() );
};

// setTimeout(() => {
//     console.log("delayed response by 1s")    
// }, 1000);

export const get = ( url, params ) => request( url, params, 'GET' );
export const post = ( url, params ) => request( url, params, 'POST');


