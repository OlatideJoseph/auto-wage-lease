import * as React from 'react'
import { Route, useNavigate } from 'react-router-dom'

const PrivateRoute = ({user, children, ...otherProps}) => {
  const navigate = useNavigate()
  if (user){
    return (
      <Route
        {...otherProps}
        element={
          children
        }
      />
    )
  } else {
    navigate('/login')
  }
}

export default PrivateRoute