import { withRouter } from "react-router-dom"
import React, { Component } from 'react'
import { Table, Form, Button, Card, Accordion, Col } from 'react-bootstrap'
import { BsFillXSquareFill } from 'react-icons/bs';

const url = "http://18.224.214.17:8000"
const urlCategoria = url + '/categoria-profissional/'

class CategoriaProfissional extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.state = {
      lists: [],
      id: null,
      nome: null,
      response: null,
      newCategoria: null,
      abreviacao: null
    }
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
    //console.log(this.state.newCategoria)
  } 

  handleSubmit(e) {
    try { 
      fetch(urlCategoria, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        "nome": this.state.newCategoria,
        "abreviacao": this.state.abreviacao
      })
      }).then(response => { 
        response.json().then((result) => {
          //console.warn("result", result)
        })
      })
    } catch(error) {
      console.error(error)
    }
    e.preventDefault()
  }

  componentDidMount() {
    try { 
      fetch(urlCategoria, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(response => response.json())
      .then(blocoList => {
        this.setState({ lists: blocoList })
        //console.warn("result", blocoList)
      })
    } catch(error) {
      console.error(error)
    }
  }

  handleDelete() {
    if (this.state.name === null || this.state.name === null) return
    //console.warn("nome", this.state.nome)
    //console.warn("url", url + this.state.id + '/')
    fetch(urlCategoria + this.state.id + '/', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        "nome": this.state.nome
      })
    }).then((response) => {
      response.json().then((result) => {
        //console.warn("result", result)
        this.setState({
          response: result.detail ? false : true
        })
      })
      window.location.reload(true)
    })
  }

  render() {
    return (
      <>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
          Adicionar nova categoria
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
            <Form onSubmit={this.handleSubmit}>
    <Form.Row>
      <Form.Group as={Col} controlId="newCategoria">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" placeholder="Nome da categoria" onChange={this.handleChange} />
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Form.Group as={Col} controlId="abreviacao">
        <Form.Label>Abreviação</Form.Label>
        <Form.Control type="text" placeholder="Abreviação da categoria" onChange={this.handleChange} />
      </Form.Group>
    </Form.Row>

  <Button variant="danger" type="submit" value="submit">
  Criar
  </Button>
</Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <br />
      {this.state.lists && this.state.lists.length === 0 ?
      <p>Não há categorias cadastradas</p>
      : 
      <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Abreviação</th>
            <th style={{width: 5}}>Remover</th>
          </tr>
        </thead>
        <tbody>
      {this.state.lists !== undefined && this.state.lists.map((categoria) =>
        <tr>
          <th>{categoria.id}</th>
          <th>{categoria.nome}</th>
          <th>{categoria.abreviacao}</th>
          <th>
          <th className="options"
              onMouseOver={() => {this.setState({nome: categoria.nome, id: categoria.id})}}
             onClick={() => {this.handleDelete()}}><BsFillXSquareFill />
          </th>
          </th>
        </tr>
        )}
        </tbody>
      </Table>
      </>}
      </>
    )
  }
}

export default withRouter(CategoriaProfissional)
