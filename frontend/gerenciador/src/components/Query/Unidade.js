import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

const url = "http://18.224.214.17:8000"
const urlUnidade = url + '/unidade/'
export default class Bloco extends Component {
  constructor() {
    super();
    this.state = {
      lists: []
    }
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    fetch(urlUnidade, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(response => response.json())
      .then(result => {
        this.setState({ lists: result })
        //console.warn("result", result)
      })
  }
  /*get(url, tipo) {
    try {
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(response => response.json())
        .then(list => {
          //this.setState({ lists: JSON.stringify(blocoList, 2) })
          this.setState({[tipo] : list })
          //console.warn("result", list)
        })
    } catch(error) {
      console.error(error)
    }
  }*/

  render() {
    return(
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Bloco</th>
          </tr>
        </thead>
        <tbody>
        {this.state.lists.map((item) =>
        <tr>
          <th>{item.id}</th>
          <th>{item.nome}</th>
          <th>{item.bloco.nome}</th>
        </tr>
        )}
        </tbody>
      </Table>
    )
  }
}
