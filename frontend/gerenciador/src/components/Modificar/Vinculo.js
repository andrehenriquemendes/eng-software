import { withRouter } from "react-router-dom"
import React, { Component } from 'react'
import { Table, Form, Button, Card, Accordion, Col } from 'react-bootstrap'
import { BsFillXSquareFill } from 'react-icons/bs';

const url = "http://18.224.214.17:8000/"
const urlVinculo = url + 'vinculo/'

class Vinculo extends Component {
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
      newVinculo: null,
      abreviacao: null
    }
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
    //console.log(this.state.newVinculo)
  } 

  handleSubmit(e) {
    try { 
      fetch(urlVinculo, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        "nome": this.state.newVinculo,
        "abreviacao": this.state.abreviacao
      })
      }).then(response => { 
        response.json().then((result) => {
          console.warn("result", result)
        })
      })
    } catch(error) {
      console.error(error)
    }
    e.preventDefault()
  }

  componentDidMount() {
    try { 
      fetch(urlVinculo, {
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
    fetch(url + this.state.id + '/', {
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
        console.warn("result", result)
        this.setState({
          response: result.detail ? false : true
        })
      })
      //window.location.reload(true)
    })
  }

  render() {
    return (
      <>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
          Adicionar novo vínculo
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
            <Form onSubmit={this.handleSubmit}>
    <Form.Row>
      <Form.Group as={Col} controlId="newVinculo">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" placeholder="Nome do vínculo" value={this.state.newVinculo} onChange={this.handleChange} />
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="abreviacao">
        <Form.Label>Abreviação</Form.Label>
        <Form.Control type="text" placeholder="Abreviação" value={this.state.abreviacao} onChange={this.handleChange} />
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
      <p>Não há vínculos cadastrados</p>
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
      {this.state.lists !== undefined && this.state.lists.map((vinculo) =>
        <tr>
          <th>{vinculo.id}</th>
          <th>{vinculo.nome}</th>
          <th>{vinculo.abreviacao}</th>
          <th>
          <th className="options"
              onMouseOver={() => {this.setState({nome: vinculo.nome, id: vinculo.id})}}
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

export default withRouter(Vinculo)
