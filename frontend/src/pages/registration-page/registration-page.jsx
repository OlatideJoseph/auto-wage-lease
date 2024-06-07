import * as React from 'react'
import './registration-page.css'


const RegistrationPage = ({url}) => {
	return(
    <div className='registration-page'>
      <h1>Registration Page</h1>
      <form className='register-form'>
        
        <span>Already have an account? <a href='/login'>Login</a></span><br/>
        <button type='button'>
          Submit Data
        </button>
      </form>
    </div>
  )
}

export default RegistrationPage