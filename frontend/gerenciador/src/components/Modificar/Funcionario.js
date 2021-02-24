import { withRouter } from "react-router-dom"
import React, { Component } from 'react'
import { Table, Form, Button, Card, Accordion, Col } from 'react-bootstrap'
import { BsFillXSquareFill } from 'react-icons/bs';

const url = "http://18.224.214.17:8000"
const urlFuncionario = url + '/funcionario/'
const urlVinculo = url + '/vinculo/'
const urlCategoria = url + '/categoria-profissional/'

class Funcionario extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: [],
      vinculoList: [],
      categoriaList: [],
      id: null,
      nome: null,
      novoFuncionario: null,
      novoRfre: null,
      novoCoren: null,
      novaCategoria: null,
      novoVinculo: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleSubmit(e) {
    console.warn("novoBloco", this.state)
    console.warn("novofuncionario", this.state.novoFuncionario)
    console.warn("novorfre", this.state.novoRfre)
    console.warn("novocoren", this.state.novoCoren)
    console.warn("novacategoria", this.state.novaCategoria)
    console.warn("novovinculo", this.state.novoVinculo)
    e.preventDefault()
    try {
      fetch(urlFuncionario, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          "nome": this.state.novoFuncionario,
          "rfre": this.state.novoRfre,
          "coren": this.state.novoCoren,
          "categoria": this.state.novaCategoria,
          "vinculo": this.state.novoVinculo
        })
      }).then(response => {
          console.warn("response", response)
      })
    } catch(error) {
      console.error(error)
    }
    console.log("afa")
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
    //console.log(this.state)
    //console.log(this.state.novoFuncionario)
    //console.warn(e.target.id, this.state.[e.target.id])
  } 

  getCategoria() {
    try {
      fetch(urlCategoria, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(response => response.json())
        .then(list => {
          //this.setState({ lists: JSON.stringify(blocoList, 2) })
          this.setState({ categoriaList: list })
          console.warn("result", list)
        })
    } catch(error) {
      console.error(error)
    }
  }

  getVinculo() {
    try {
      fetch(urlVinculo, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(response => response.json())
        .then(list => {
          //this.setState({ lists: JSON.stringify(blocoList, 2) })
          this.setState({ vinculoList: list })
          console.warn("result", list)
        })
    } catch(error) {
      console.error(error)
    }
  }
  
  handleDelete() {
    const access = localStorage.getItem('auth')
    if (access === null) return false
    var val
    try {
      val = JSON.parse(access)["access"]
      console.warn("nome", this.state.nome)
      console.warn("url", urlFuncionario + this.state.id + '/')
      fetch(urlFuncionario + this.state.id + '/', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': 'Bearer ' + val
        },
        body: JSON.stringify({
          'nome': this.state.nome
        })
      })
    } catch(e) {
      console.log(e)
      return false
    }

    
  }

  componentDidMount() {
    try {
      fetch(urlFuncionario, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        }
      }).then(response => response.json())
        .then(list => {
          this.setState({ lists: list })
        //console.warn("lists", this.lists)
      })
    } catch(error) {
      console.error(error)
    }
    this.getVinculo()
    this.getCategoria()
  }

  render() {
    return(
      <>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
          Adicionar novo funcionário
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
          <Form onSubmit={this.handleSubmit}>
    <Form.Row>
      <Form.Group as={Col} controlId="novoFuncionario">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" placeholder="Nome do funcionário" onChange={this.handleChange} />
      </Form.Group>
    </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="novoVinculo">
        <Form.Label>Vinculo</Form.Label>
        <Form.Control as="select" onChange={this.handleChange}>
        <option>Escolha...</option>
        {this.state.vinculoList.map((list) =>
        <option value={list.id}>{list.nome}</option>
        )}
        </Form.Control>
      </Form.Group>
    <Form.Group as={Col} controlId="novaCategoria">
        <Form.Label>Categoria profissional</Form.Label>
        <Form.Control as="select" onChange={this.handleChange}>
        <option>Escolha...</option>
        {this.state.categoriaList.map((list) =>
        <option value={list.id}>{list.nome}</option>
        )}
        </Form.Control>
      </Form.Group>
  </Form.Row>
  <Form.Row>
    <Form.Group as={Col} controlId="novoRfre">
      <Form.Label>Rfre</Form.Label>
      <Form.Control type="text" placeholder="Rfre"  onChange={this.handleChange} />
    </Form.Group>

    <Form.Group as={Col} controlId="novoCoren">
      <Form.Label>Coren</Form.Label>
      <Form.Control type="text" placeholder="Coren" onChange={this.handleChange} />
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
        <p>Não há funcionarios cadastrados</p>
        :
        <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Unidade</th>
            <th>Rfre</th>
            <th>Coren</th>
            <th style={{width: 5}}>Remover</th>
          </tr>
        </thead>
        <tbody>
        {this.state.lists !== undefined && this.state.lists.map((funcionario) =>
        <tr>
          <th>{funcionario.id}</th>
          <th>{funcionario.nome}</th>
          <th>{funcionario.categoria.nome}</th>
          <th>{funcionario.vinculo.abreviacao}</th>
          <th>{funcionario.rfre}</th>
          <th>{funcionario.coren}</th>
          <th>
            <th className="options"
              onMouseOver={() => {this.setState({nome: funcionario.nome, id: funcionario.id})}}
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

export default withRouter(Funcionario)