import { Button, Table, Tab, Col, Row, Nav } from 'react-bootstrap'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

const urlBloco = 'http://127.0.0.1:8000/bloco/'
const urlUnidade = 'http://127.0.0.1:8000/unidade/'
const urlEscala = 'http://127.0.0.1:8000/escala/'

class BaterPonto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocoList: [],
      unidadeList: [],
      escalaList: [],
      ponto: [{
        idFuncionario: null,
        presente: false,
        data: null
      }]
    }
  }

  async getUnidades() {
    var dict = {}
    for (var i in this.state.unidadeList.id) {
      if (dict[i] === null) {
        await console.log(i)
      }
    }
    var x = await this.state.unidadeList
    console.warn("x", x)
  }

  async get(url, tipo) {
    try {
      await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(response => response.json())
        .then(list => {
          //this.setState({ lists: JSON.stringify(blocoList, 2) })
          this.setState({ [tipo]: list })
          //console.warn("result", list)
        })
        this.getUnidades()
    } catch(error) {
      console.error(error)
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.get(urlBloco, 'blocoList')
    this.get(urlUnidade, 'unidadeList')
    this.get(urlEscala, 'escalaList')
    //this.getUnidades()
    //console.warn("blocoList", this.state.blocoList)
  }

  render() {
    return (
      <div className="Escala">

        {this.state.blocoList.map((item) =>
      <>
        <h2>Bloco {item.nome}</h2>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
    <Row>
      <Col sm={3}>
        <Nav variant="pills" className="flex-column">
          {this.state.unidadeList.map((unidade => 
            {return  (
              unidade.bloco === item.id && 
          <Nav.Item>
            <Nav.Link eventKey={unidade.id}>Unidade: {unidade.nome} </Nav.Link>
          </Nav.Item>
              )}))}
        </Nav>
      </Col>
      <Col sm={9}>
        <Tab.Content>
        {this.state.unidadeList.map((unidade => {
          return  (
              unidade.bloco === item.id && 
          <Tab.Pane eventKey={unidade.id}>
          <Table responsive>
            {this.state.escalaList.map (escala =>  {
          return ( 
              escala.unidade === unidade.id &&
            <>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID_Funcionario</th>
              {Array.from({ length: 30 }).map((_, index) => (
                <th key={index}>DATA</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{escala.id}</td>
              <td>{escala.funcionario}</td>
              {Array.from({ length: 30 }).map((_, index) => (
                {index} <= 2 ?
                <td key={index}>Dados {index}</td>
                : <td key={index}>
                    <Button variant="success">X</Button>
                  </td>
              ))}
            </tr>
          </tbody>
          </>
          )}
          )
        }
        </Table>
        <Button variant="danger">Registrar</Button>
          </Tab.Pane>
              )}))}
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
  </>
    )}
      </div> 
    )
  }
}

export default withRouter(BaterPonto)
