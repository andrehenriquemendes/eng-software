import { withRouter } from "react-router-dom"
import React, { Component } from 'react'
import { Table, Form, Button, Card, Accordion, Col } from 'react-bootstrap'
import { BsFillXSquareFill } from 'react-icons/bs';

const url = "http://18.224.214.17:8000"
const urlBloco = url + '/bloco/'

class Bloco extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      lists: [],
      id: null,
      nome: null,
      response: false,
      novoNome: null,
      mensagemErro: null
    }
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
    //console.log(this.state.novoNome)
  } 

  async handleSubmit(e) {
    try { 
      fetch(urlBloco, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        "nome": this.state.novoNome
      })
      }).then(response => { 
        response.json().then((result) => {
          console.warn("result", result)
        })
      })
    this.componentDidMount()
    } catch(error) {
      console.error(error)
    }
    e.preventDefault()
  }

  componentDidMount() {
    try { 
      fetch(urlBloco, {
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

  async handleDelete(item) {
    if (this.state.nome === null || this.state.id === null) return
    //console.warn("nome", this.state.nome)
    //console.warn("url", url + this.state.id + '/')

    try {
      await fetch(url + this.state.id + '/', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          "nome": this.state.nome
        })
      }).then((response) => {
        if (response.json().then()(result => {})) {
          response.json().then((result) => {
            console.warn("result", result)
            this.setState({
              response: result.detail ? false : true
            })
            if (this.state.response === false) {
              console.warn("item", item)
              const data = this.state.lists.filter(i => i.id !== item.id)
              var index = this.state.lists.indexOf(item.nome)
              this.state.lists.splice(index - 1, 1)
              this.setState({ data })
            } else {
              this.setState({
                mensagemErro: "não é possível deletar devido há dependências."
              })
            }
          })
        } else {
          this.setState({
            mensagemErro: "não é possível deletar devido há dependências."
          })
        }
      })
    } catch(error) {
      console.log(error)
    }
    
  }

  render() {
    const listItem = this.state.lists.map((bloco) =>
        <tr key={bloco}>
          <th>{bloco.id}</th>
          <th>{bloco.nome}</th>
          <th>
          <th className="options"
              onMouseOver={() => {this.setState({nome: bloco.nome, id: bloco.id})}}
             onClick={() => {this.handleDelete(bloco)}}><BsFillXSquareFill />
          </th>
          </th>
        </tr>
        )
    return (
      <>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
          Adicionar novo bloco
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
            <Form onSubmit={this.handleSubmit}>
    <Form.Row>
      <Form.Group as={Col} controlId="novoNome">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" placeholder="Nome do bloco" onChange={this.handleChange} />
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
      <p>Não há blocos cadastrados</p>
      : 
      <>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th style={{width: 5}}>Remover</th>
          </tr>
        </thead>
        <tbody>
          {listItem}
        </tbody>
      </Table>
      </>}
      {this.state.mensagemErro}
      </>
    )
  }
}

export default withRouter(Bloco)
