import Login from './../Login/Login';
//import React, { useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import { useContext } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
  const { loggedIn } = useContext(UserContext)

  const data = useLoaderData()
  if(!loggedIn) return <Login />
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github followers: {data.id}
      <img src={data.avatar_url} alt="Git picture" width={300} />
      <div className="font-thin text-lg text-left">
        Name : {data.name} <br />
        Location : {data.location} <br />
      </div>
    </div>
  )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/sanjaybh')
    return response.json()
}