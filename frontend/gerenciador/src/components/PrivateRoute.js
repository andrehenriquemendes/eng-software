import React, { useContext, useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../IsAuth'

function PrivateRoute({ component: Component, ...rest }) {
  const {auth} = useContext(AuthContext)
  const [validCredentials, setValidCredentials] = useState(false)

  useEffect(() => {
    if (typeof auth === "boolean") {
      setValidCredentials(auth)
    }
  }, [auth])
  //console.warn("auth in PrivateRoute", auth)

  return (
    <Route {...rest} render={props => (
      validCredentials ?
        <Component {...props} />
      : <Redirect to="/login" />
    )} />
  )
}

export default PrivateRoute
