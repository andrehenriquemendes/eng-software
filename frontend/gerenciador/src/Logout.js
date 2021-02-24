import { Component } from "react"
import { Redirect } from 'react-router-dom'

export default class Logout extends Component {
  logout () {
    return (
      localStorage.clear("auth"),
      <Redirect to="/login" />,
      <div><p>Você está sendo deslogado</p></div>,
      window.location.reload(true)
    )
  }

  render () {
    return this.logout()
  }
}