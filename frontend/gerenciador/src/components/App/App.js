import { BrowserRouter as Switch, Route } from 'react-router-dom'
import Consulta from '../Consulta.js'
import Escala from '../Escala.js'
import Login from '../../Login.js'
import { Container } from 'react-bootstrap'
import PrivateRoute from '../PrivateRoute.js'
import PublicRoute from '../PublicRoute.js'
import Menu from '../Menu.js'
import Logout from '../../Logout'
import './App.css'
import IsAuth from '../../IsAuth'
import { Component } from 'react'
import Bloco from '../Modificar/Bloco'
import BaterPonto from '../BaterPonto'
import CategoriaProfissional from '../Modificar/CategoriaProfissional'
import Funcionario from '../Modificar/Funcionario'
import Unidade from '../Modificar/Unidade'
import Vinculo from '../Modificar/Vinculo'
import { default as ModificarEscala } from '../Modificar/Escala'

export default class App extends Component {
    constructor(props) {
      super(props)
      this.state = { value: "" }
    }

  render() {
    return (
      <Route>
      <IsAuth>
      <Switch>
      <div className='Menu'>
      <Menu />
      </div>
      <div className='Content'>
      <Container>
        <PublicRoute restricted={true} component={ Login } exact path="/login" />
        <PrivateRoute component={ Consulta } path="/" exact />
        <PrivateRoute component={ Escala } path="/escala" exact />
        <PrivateRoute component={ BaterPonto } path="/baterponto" exact />
        <PrivateRoute component={ Bloco } path="/modificar/bloco" exact />
        <PrivateRoute component={ Funcionario } path="/modificar/funcionario" exact />
        <PrivateRoute component={ Unidade } path="/modificar/unidade" exact />
        <PrivateRoute component={ Vinculo } path="/modificar/vinculo" exact />
        <PrivateRoute component={ CategoriaProfissional } path="/modificar/categoria-profissional" exact />
        <PrivateRoute component={ ModificarEscala } path="/modificar/escala" exact />
        <PrivateRoute component={ Logout } path="/logout" exact />
      </Container>
      </div>
      </Switch>
      </IsAuth>
      </Route>
    )
  };
}

