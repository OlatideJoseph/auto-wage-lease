import * as React from 'react'
import axios from 'axios'
import Schedule from './components/schedule/schedule'
import LoginPage from './pages/login-page/login-page'
import RegistrationPage from './pages/registration-page/registration-page'
import './App.css'

/* url to make request to */
const apiUrl = 'https://api.paystack.co/'
const url = 'http://localhost:8000/'

const App = ()=> {
  return (
    <>
      <Schedule
        apiUrl={apiUrl}
        url={url}
      />
      <LoginPage
        url={url}
      />
      <RegistrationPage
        url={url}
      />
    </>
  )
}

export default App
