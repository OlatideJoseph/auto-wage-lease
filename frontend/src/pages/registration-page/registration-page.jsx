import * as React from 'react'
import axios from 'axios'
import './registration-page.css'


const RegistrationPage = ({url, user, setUser}) => {
  const handleRegistration = () => {
    axios.post(`${url}dj-rest-auth/registration`,
      document.querySelector('.register-form')
    )
    .then(resp => resp.data)
    .then(data => {
      alert("User created successfully")
      alert(JSON.stringify(data))
    })
    .catch(error => {
      let resp = error.response
      let resp_keys = Object.keys(resp.data)
      resp_keys.forEach(v => {
        alert(resp.data[v][0])
      })
    })
  }
	return(
    <div className='registration-page'>
      <h1>Registration Page</h1>
      <form className='register-form'>
        <label htmlFor='username'>Username:
        </label>
        <input id='username' name='username' type='text'/>
        <br/>
        <label htmlFor='email'>Email:
        </label>
        <input id='email' name='email' type='email'/>
        <br/>
        <label htmlFor='password1'>Password1:
        </label>
        <input id='password1' name='password1' type='password'/>
        <br/>
        <label htmlFor='password2'>Password2:
        </label>
        <input id='password2' name='password2' type='password'/>
        <br/>
        <span>Already have an account? <a href='/login'>Login</a></span><br/>
        <button onClick={handleRegistration} type='button'>
          Submit Data
        </button>
      </form>
    </div>
  )
}

export default RegistrationPage