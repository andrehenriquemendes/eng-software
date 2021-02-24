import React from 'react'
import { withRouter } from 'react-router-dom'
import { Nav, Tab, Row, Col } from 'react-bootstrap'
import Bloco from './Query/Bloco'
import Funcionario from './Query/Funcionario'
import Unidade from './Query/Unidade'

function Consulta() {
  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
    <Col sm={3}>
      <Nav variant="pills" className="flex-column" activeClassName="tois">
        <Nav.Item>
          <Nav.Link eventKey="first">Bloco</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">Funcionario</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="third">Unidade</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
    <Col sm={9}>
      <Tab.Content>
        <Tab.Pane eventKey="first">
          <Bloco />
        </Tab.Pane>
        <Tab.Pane eventKey="second">
          <Funcionario />
        </Tab.Pane>
        <Tab.Pane eventKey="third">
          <Unidade />
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
    </div>
  )
}

export default withRouter(Consulta)
