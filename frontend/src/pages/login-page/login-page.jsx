import * as React from 'react'
import axios from 'axios'
import './login-page.css'

const LoginPage = ({ url, user, setUser }) => {
  const [password, passwordDispatcher] = React.useReducer((state, action) => {
    switch (action.type){
      case 'SET_PASSWORD':
        return {
          ...state,
          password: action.payload
        }
      case 'SET_SATISFIED':
        return {
          ...state,
          satisfied: action.payload
        }
      default:
        throw new Error()
    }
  }, {password: ''})
  /*USERNAME DISPATCHER*/
  const [username, usernameDispatcher] = React.useReducer((state, action) => {
    switch (action.type){
      case 'SET_USERNAME':
        return {
          ...state,
          username: action.payload
        }
      case 'SET_SATISFIED':
        return {
          ...state,
          satisfied: action.payload
        }
      default:
        throw new Error()
    }

  }, {username: '', statisfied: false })
  /*PRINTS THE STATE DISPATCHER*/
  React.useEffect(()=>{
    console.log(password, username)
  }, [password, username])

  const handleSubmit = (event) => {
    const form = document.querySelector('#form')
    axios.post(`${url}dj-rest-auth/login/`,
      document.querySelector('#form'),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then( resp => resp.data )
    .then(data => {
      localStorage.setItem('refresh-token', `${data.key}`)
      axios.get(`${url}dj-rest-auth/user/`,
      {
        headers:{
          'Authorization': `Token ${data.key}`
        }
      })
      .then(resp => resp.data)
      .then(data => {setUser(data)})
      .catch(error => {alert('Error Occured')})
    })
  }
  
  return (
    <div className='login-page'>
      <h1>LoginPage</h1>
      <form id='form'  method='post'>
        <label htmlFor='username'>
          Username:
        </label>
        <input
          placeholder='username'
          onChange={(e)=>{usernameDispatcher({type:'SET_USERNAME', payload: e.target.value})}}
          type='text'
          name='username'
          id='username'
        />
        <br/>
        <label htmlFor='password'>
          Password:
        </label>
        <input
          placeholder='password'
          onChange={(e)=>{passwordDispatcher({type:'SET_PASSWORD', payload: e.target.value})}}
          type='text'
          name='password'
          id='password'
        />
        <br/>
        {/*<span>Need an account? <a href='/registration'>Register</a></span><br/>*/}
        <button onClick={handleSubmit} type='button'>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage