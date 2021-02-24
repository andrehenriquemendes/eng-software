import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import './login.css'

const url = 'http://127.0.0.1:8000/token/'
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      responseUsername: false,
      responsePassword: false,
      responseLogin: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
    //console.log(this.state)
  }

  handleSubmit(e) {
    //console.log(this.state)
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(this.state)
      }).then((response) => {
        response.json().then((result) => {
          //console.warn("result", result)
          this.setState({
            responseUsername: result.username ? true : false,
            responsePassword: result.password ? true : false,
            responseLogin: result.detail ? true : false,
          })
          localStorage.setItem('auth', JSON.stringify({
            refresh: result.refresh,
            access: result.access
          }))
        if (!this.state.responseUsername && !this.state.responsePassword && !this.state.responseLogin) 
          window.location.reload(true)
        })
      })
    } catch(error) {
      console.error(error)
    }
    e.preventDefault()
  }

  render() {
    return (
      <Row>
      <Col sm></Col>
      <Col sm>
      <Form onSubmit={this.handleSubmit}>
      <Form.Group>
        <Form.Label>Usuário</Form.Label>
        <Form.Control type="text" id="username" placeholder="Nome de Usuário" value={this.state.username} onChange={this.handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <p className="mensagemErro">{this.state.responseUsername ? "Preencha o campo de usuário." : null}</p>
    
      <Form.Group>
        <Form.Label>Senha</Form.Label>
        <Form.Control value={this.state.password} type="password" id="password" placeholder="Senha" onChange={this.handleChange} />
      </Form.Group>
      <p className="mensagemErro">{this.state.responsePassword ? "Preencha o campo de senha." : null}</p>

      <Button variant="dark" type="submit" value="submit">
        Entrar
      </Button>
    </Form>
    <p className="mensagemErro">{this.state.responseLogin ? "Usuário e/ou senha inválido.": null}</p>
    </Col>
    <Col sm></Col>
    </Row>
    )
  }
}

