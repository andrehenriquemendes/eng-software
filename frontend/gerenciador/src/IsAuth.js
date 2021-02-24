import React from 'react'
import { Component } from 'react'
export const AuthContext = React.createContext({})

const url = "http://18.224.214.17:8000"
const urlVerify = url + '/token/verify/'
const urlRefresh = url + '/token/refresh/'
const token = localStorage.getItem('auth')

export default class isAuth extends Component {
  constructor(props) {
    super(props)
    //this.isAuthenticated = this.isAuthenticated.bind(this)
    this.state = {
      auth: false,
      check: false,
      refresh: false
    }
  }

  getAccess() {
    if (token === null) return false
    var val
    try {
      val = JSON.parse(token)["refresh"]
    } catch(e) {
      console.log(e)
      return false
    }
    console.warn("refresh", val)

    try { 
      fetch(urlRefresh, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        "refresh": val
      })
    }).then((response) => {
      response.json().then((result) => {
        console.warn("result", result)
        this.setState({refresh: true})
        localStorage.setItem('auth', JSON.stringify({
          refresh: val,
          access: result.access
        }))
        //console.warn("result length", JSON.stringify(result).length)
      })
    })
    } catch(e) {
      console.error(e)
    }
  }

  isAuthenticated () {
    var state
    if (token === null) return false
    var val
    try {
      val = JSON.parse(token)["access"]
    } catch(e) {
      console.log(e)
      return false
    }

    try {
      fetch(urlVerify, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          "token": val
        })
      }).then((response) => {
          console.warn("response", response)
        response.json().then((result) => {
          state = JSON.stringify(result).length
          //console.warn("result length", JSON.stringify(result).length)
          if (state === 2) this.setState({auth: true})
        })
      })
      //console.warn("state", state)
    } catch(error) {
      console.error(error);
    }
    this.setState({check: true})
  }

  render() {
  if (this.state.refresh === false) this.getAccess()
  if (this.state.check === false) this.isAuthenticated()
  //console.warn("auth before return", this.state.auth)
  const auth = this.state.auth
    return (
      <AuthContext.Provider value={{auth}} {...this.props}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}