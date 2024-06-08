import * as React from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import Schedule from './components/schedule/schedule'
import LoginPage from './pages/login-page/login-page'
import RegistrationPage from './pages/registration-page/registration-page'
import Redirect from './components/redirect/redirect.jsx'
import './App.css'

/* url to make request to */
const apiUrl = 'https://api.paystack.co/'
const url = 'http://localhost:8000/'

const App = ()=> {
  const [user, setUser] = React.useState({})
  React.useEffect(()=>{
    const token = localStorage.getItem('refresh-token')
    if (token){
      axios.get(`${url}dj-rest-auth/user/`,
      {
        headers:{
          'Authorization': `Token ${token}`
        }
      })
      .then(resp => resp.data)
      .then(data => {setUser(data)})
      .catch(error => {alert('Error Occured')})
    }
  }, [])

  const logOut = () => {
    setUser({})
    localStorage.clear()
  }
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            (user.username) ? (
              <Schedule
                apiUrl={apiUrl}
                url={url}
                user={user}
                logOut={logOut}
              />
            ):(
              <Redirect to='/login'/>
            )
          }
          />
          <Route
          path='/login'
          element={
            (user.username)? (
              <Redirect to='/'/>
            ):(
            <LoginPage
              url={url}
              user={user}
              setUser={setUser}
            />)
          }
          />
          <Route
            path='/registration'
            element={
              (user.username) ? (
                <Redirect to='/'/>
              ): (
                <RegistrationPage
                  url={url}
                  user={user}
                  setUser={setUser}
                />
              )
            }
          />
      </Routes>
    </>
  )
}

export default App
