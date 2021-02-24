import { withRouter } from "react-router-dom"
import React, { Component } from 'react'
import { Table, Form, Button, Card, Accordion, Col } from 'react-bootstrap'
import { BsFillXSquareFill } from 'react-icons/bs'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { v1 as uuid } from 'uuid'

const url = "http://18.224.214.17:8000"
const urlEscala = url + '/escala/'
const urlFuncionario = url + '/funcionario/'
const urlUnidade = url + '/unidade/'


class Escala extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      unidadeList: [],
      funcionarioList: [],
      periodo: [],
      dataInicio: new Date(),
      dataFim: new Date(),
      horarioEntrada:  null,
      horarioSaida: null,
      unidade: null,
      items: [{ 
        id: uuid(), 
        idFuncionario: null 
      }]
    }
    this.addListItem = this.addListItem.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.createList = this.createList.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
    //console.log(this.state.chill)
  } 

  addListItem() {
    const newItem = { id: uuid(), idFuncionario: null }
    this.setState({
      items: [...this.state.items, newItem]
    });
  };

  onInputChange(e) {
    const { id, value } = e.target;

    const newArr = this.state.items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          idFuncionario: value
        }
      } else {
        return item
      }
    })

    this.setState({
      items: newArr
    })
  }
        /*<div>
          <label>enter name</label>
          <input
            id={item.id}
            onChange={this.onInputChange}
            type="text"
            placeholder="what's your name"
            value={item.text}
          />
        </div>*/
  createList() {
    const { items } = this.state
    return items.map(item => {
        return (
          <Form.Row className="listaFuncionarios">
            {/*<Form.Group as={Col} controlId={item.id}>*/}
              <Form.Label>Funcionário</Form.Label>
              <Form.Control as="select" id={item.id} value={item.idFuncionario} onChange={this.onInputChange}>
                <option>Escolha...</option>
                {this.state.funcionarioList.map((list) =>
                <option value={list.id}>{list.nome}</option>
                )}
              </Form.Control>
            {/*</Form.Group>*/}
          </Form.Row>
        )
    })
  }

  async handleSubmit(e) {
    e.preventDefault()
    try {
      var ret = []
      for (var i = 0; i < this.state.items.length; i++) {
        ret.push({
          "id": this.state.items[i].idFuncionario,
          "horario_entrada": JSON.stringify(this.state.horarioEntrada.toTimeString()).substr(1, 8),
          "horario_saida": JSON.stringify(this.state.horarioSaida.toTimeString()).substr(1, 8)
        })
      }
      await fetch(urlEscala, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        "periodo": {
          "inicio": JSON.stringify(this.state.dataInicio.toISOString()).substr(1, 10),
          "final": JSON.stringify(this.state.dataFim.toISOString()).substr(1, 10)
        },
        "distribuicao": [{
          "unidade": this.state.unidade,
          "funcionarios": ret
        }]
      })
      }).then(response => { 
        console.log(response)
      })
    } catch(error) {
      console.error(error)
    }
    console.log(ret)
    //console.log(JSON.stringify(this.state.dataInicio.toISOString()).substr(1, 10))
    //console.log(this.state.items)
  }

  getUnidade() {
    try {
      fetch(urlUnidade, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(response => response.json())
        .then(list => {
          //this.setState({ lists: JSON.stringify(blocoList, 2) })
          this.setState({ unidadeList: list })
          console.warn("result", list)
        })
    } catch(error) {
      console.error(error)
    }
  }
  
  getFuncionario() {
    try {
      fetch(urlFuncionario, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(response => response.json())
        .then(list => {
          //this.setState({ lists: JSON.stringify(blocoList, 2) })
          this.setState({ funcionarioList: list})
          console.warn("result", list)
        })
    } catch(error) {
      console.error(error)
    }
  }

  componentDidMount() {
    try { 
      fetch(urlEscala, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(response => response.json())
      .then(escalaList => {
        //this.setState({ lists: JSON.stringify(blocoList, 2) })
        this.setState({ lists: escalaList })
        //console.warn("result", blocoList)
      })
    } catch(error) {
      console.error(error)
    }
    this.getUnidade()
    this.getFuncionario()
  }

  render() {
    return (
      <>
      <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
        Criar nova escala
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
      <Form onSubmit={this.handleSubmit}>
            <Form.Row className="align-items-center"><Form.Label>Período</Form.Label></Form.Row>
            <Form.Row>
    <Form.Group as={Col} controlId="dataInicio">
            <Form.Label>Início</Form.Label>
            <DatePicker 
            dateFormat="dd/MM/yyyy"
            showDateSelect
            showDateSelectOnly
            selected={this.state.dataInicio} 
            onChange={date => this.setState({dataInicio: date})} 
            className="text-center"
            />
    </Form.Group>
    <Form.Group as={Col} controlId="dataFim">
            <Form.Label>Fim</Form.Label>
            <DatePicker 
            dateFormat="dd/MM/yyyy"
            showDateSelect
            showDateSelectOnly
            selected={this.state.dataFim} 
            onChange={date => this.setState({dataFim: date})} 
            className="text-center"
            />
    </Form.Group>
            </Form.Row>
            <br />
  <Form.Row>
    <Form.Group as={Col} controlId="horarioEntrada">
      <Form.Label>Horário de entrada</Form.Label>
      <DatePicker
      className="text-center"
      selected={this.state.horarioEntrada}
      onChange={time => this.setState({horarioEntrada: time})}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      timeFormat="kk:mm"
      dateFormat="kk:mm"
      />
    </Form.Group>

    <Form.Group as={Col} controlId="horarioSaida">
    <Form.Label>Horário de saída</Form.Label>
      <DatePicker
      className="text-center"
      selected={this.state.horarioSaida}
      onChange={time => this.setState({horarioSaida: time})}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      timeFormat="kk:mm"
      dateFormat="kk:mm"
      />
    </Form.Group>
  </Form.Row>

<Form.Row>
  <Form.Group as={Col} controlId="unidade">
      <Form.Label>Unidade</Form.Label>
      <Form.Control as="select" onChange={this.handleChange}>
        <option>Escolha...</option>
        {this.state.unidadeList.map((list) =>
        <option value={list.id}>{list.nome}</option>
        )}
      </Form.Control>
    </Form.Group>
</Form.Row>

<Form.Row classaName="addFuncionarios" style={{margin: '5px'}}>
{this.createList()}
<Button variant="primary" style={{margin: '10px'}} onClick={this.addListItem} type="">Adicionar novo funcionário</Button>
</Form.Row>
<br />

<Button variant="danger" type="submit">
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
            <th>ID Escala</th>
            <th>ID_Funcionario</th>
            <th>Horário entrada</th>
            <th>Horário saída</th>
            <th>ID_Unidade</th>
            <th style={{width: 5}}>Remover</th>
          </tr>
        </thead>
        <tbody>
      {this.state.lists !== undefined && this.state.lists.map((escala) =>
        <tr>
          <th>{escala.id}</th>
          <th>{escala.funcionario}</th>
          <th>{escala.horario_entrada}</th>
          <th>{escala.horario_saida}</th>
          <th>{escala.unidade}</th>
          <th>
          <th className="options"
              onMouseOver={() => {this.setState({nome: escala.nome, id: escala.id})}}
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

export default withRouter(Escala)