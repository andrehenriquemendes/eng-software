import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

const url = "http://18.224.214.17:8000"
const urlBloco = url + '/bloco/'
class Bloco extends Component {
  constructor() {
    super();
    this.state = {
      lists: []
    }
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    fetch(urlBloco, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(response => response.json())
      .then(blocoList => {
        //this.setState({ lists: JSON.stringify(blocoList, 2) })
        this.setState({ lists: blocoList })
        console.warn("result", blocoList)
      })
  }

  render() {
    return(
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
        {this.state.lists.map((bloco) =>
        <tr>
          <th>{bloco.id}</th>
          <th>{bloco.nome}</th>
        </tr>
        )}
        </tbody>
      </Table>
    )
  }
}

export default withRouter(Bloco)