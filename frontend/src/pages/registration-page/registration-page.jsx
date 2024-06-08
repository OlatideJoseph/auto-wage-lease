import * as React from 'react'
import './registration-page.css'


const RegistrationPage = ({url, user, setUser}) => {
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
        <label htmlFor='password2'>Password:
        </label>
        <input id='password2' name='password2' type='password'/>
        <br/>
        <span>Already have an account? <a href='/login'>Login</a></span><br/>
        <button type='button'>
          Submit Data
        </button>
      </form>
    </div>
  )
}

export default RegistrationPage