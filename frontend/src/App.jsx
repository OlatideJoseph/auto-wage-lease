import * as React from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import Schedule from './components/schedule/schedule'
import LoginPage from './pages/login-page/login-page'
import RegistrationPage from './pages/registration-page/registration-page'
import PrivateRoute from './components/private-route/private-route'
import './App.css'

/* url to make request to */
const apiUrl = 'https://api.paystack.co/'
const url = 'http://localhost:8000/'

const App = ()=> {
  axios.defaults.withCredentials = true
  const [user, setUser] = React.useState({})

  return (
    <>
      <Routes>
        <PrivateRoute
          path='/'
          user={user}
        >
          <Schedule
            apiUrl={apiUrl}
            url={url}
            user={user}
          />
        </PrivateRoute>
        <Route
          path='/login'
          element={
            <LoginPage
              url={url}
              user={user}
            />
          }
        />
        <Route
          path='/registration'
          element={
            <RegistrationPage
              url={url}
              user={user}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App
