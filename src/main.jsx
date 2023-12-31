import './index.css'

import Github, { githubInfoLoader } from './components/Github/Github.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import ExtraExp from './components/ExtraExp/ExtraExp';
import Home from './components/Home/Home.jsx'
import Layout from './Layout.jsx'
import Login from './components/Login/Login';
import ReactDOM from 'react-dom/client'
import RentExpenses from './components/RentExpenses/RentExpenses'
import SignUp from './components/SignUp/SignUp';
import User from './components/User/User.jsx'
import UserContextProvider from './context/UserContextProvider'
import UserTax from './components/UserTax/UserTax.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='userTax' element={<UserTax />} />
      <Route path='rentExp' element={<RentExpenses />} />
      <Route path='extraExp' element={<ExtraExp />} />
      <Route path='user/:userid' element={<User />} />

      
      <Route loader={githubInfoLoader} path='github' element={<Github />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
)
