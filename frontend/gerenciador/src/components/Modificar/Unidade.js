import { withRouter } from "react-router-dom"
import React, { Component } from 'react'
import { OverlayTrigger, Tooltip, Table, Form, Button, Card, Accordion, Col } from 'react-bootstrap'
import { BsFillXSquareFill } from 'react-icons/bs';

const url = 'http://127.0.0.1:8000/unidade/'
const urlBloco = 'http://127.0.0.1:8000/bloco/'

class Unidade extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.state = {
      lists: [],
      blocoList: [],
      id: null,
      nome: null,
      bloco: null,
      novoNome: null,
      novoBloco: null
    }
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
    //console.log(this.state.novoBloco)
  } 

  getBloco() {
    try {
      fetch(urlBloco, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(response => response.json())
        .then(list => {
          this.setState({ blocoList: list })
          console.warn("result", list)
        })
    } catch(error) {
      console.error(error)
    }
  }

  handleSubmit(e) {
    console.warn("novoBloco", this.state.novoBloco)
    try { 
      fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        "nome": this.state.novoNome,
        "bloco": this.state.novoBloco
      })
      }).then(response => { 
          console.warn("response", response)
      })
    } catch(error) {
      console.error(error)
    }
    e.preventDefault()
  }

  handleDelete() {
    if (this.state.nome === null || this.state.id === null) return
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
      window.location.reload(true)
    })
  }

  componentDidMount() {
    try {
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(response => response.json())
        .then(unidadeList => {
          //this.setState({ lists: JSON.stringify(blocoList, 2) })
          this.setState({ lists: unidadeList })
          console.warn("result", unidadeList)
      })
    } catch(error) {
      console.error(error)
    }
    this.getBloco()
  }

  render() {
    return(
      <>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
          Adicionar nova unidade
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
            <Form onSubmit={this.handleSubmit}>
    <Form.Row>
      <Form.Group as={Col} controlId="novoNome">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" placeholder="Nome da unidade" onChange={this.handleChange} />
      </Form.Group>
      </Form.Row>
      <Form.Row>
      <Form.Group as={Col} controlId="novoBloco">
        <Form.Label>Bloco</Form.Label>
        <Form.Control as="select" value={this.state.novoBloco} onChange={this.handleChange}>
          <option>Escolha...</option>
          {this.state.blocoList.map((list) =>
            <option value={list.id}>{list.nome}</option>
          )}
        </Form.Control>
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
      <p>Não há unidades cadastradas</p>
      :
      <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Bloco</th>
            <th style={{width: 5}}>Remover</th>
          </tr>
        </thead>
        <tbody>
        {this.state.lists !== undefined && this.state.lists.map((unidade) =>
        <tr>
          <th>{unidade.id}</th>
          <th>{unidade.nome}</th>
          <th>{unidade.bloco.id}</th>
          <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Remover</Tooltip>}>
              <span className="d-inline-block">
          <th 
          className="options"
          style={{ pointerEvents: 'none' }}
              onMouseOver={() => {this.setState({ nome: unidade.nome, id: unidade.id })}}
             onClick={() => {this.handleDelete()}}><BsFillXSquareFill />
             </th>
              </span>
            </OverlayTrigger>
        </tr>
        )}
        </tbody>
      </Table>
      </>}
      </>
    )
  }
}

export default withRouter(Unidade)