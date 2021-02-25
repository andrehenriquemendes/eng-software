import { withRouter } from "react-router-dom";
import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

const url = "http://18.224.214.17:8000"
const urlFuncionario = url + '/funcionario/'

class Funcionario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
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
  }

  render() {
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Unidade</th>
            <th>Rfre</th>
            <th>Coren</th>
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
          </tr>
          )}
          </tbody>
      </Table>
    )
  }
}

export default withRouter(Funcionario)