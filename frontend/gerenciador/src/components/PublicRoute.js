import React, { useContext, useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../IsAuth'

function PublicRoute({ component: Component, restricted, ...rest }) {
  const {auth} = useContext(AuthContext)
  const [validCredentials, setValidCredentials] = useState(false)

  useEffect(() => {
    if (typeof auth === "boolean") {
      setValidCredentials(auth)
    }
  }, [auth])

  return (
    <Route {...rest} render={props => (
      validCredentials && restricted ?
        <Redirect to="/" />
      : <Component {...props} />
    )} />
  )
}

export default PublicRoute
