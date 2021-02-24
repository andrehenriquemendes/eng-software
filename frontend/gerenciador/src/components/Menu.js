import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { AuthContext } from '../IsAuth'
import { useContext, useState, useEffect } from 'react'

export default function Menu() {
	const {auth} = useContext(AuthContext)
  const [validCredentials, setValidCredentials] = useState(false)

  useEffect(() => {
    if (typeof auth === "boolean") {
      setValidCredentials(auth)
    }
  }, [auth])

  return (
		<Navbar collapseOnSelect navbar-fixed-top="true" expand="lg" bg="dark" variant="dark">
    <Container fluid="md">
      <LinkContainer to="/">
			<Navbar.Brand>UNIFESP</Navbar.Brand>
      </LinkContainer>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			{validCredentials && 
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
          <LinkContainer to="/escala">
            <Nav.Link>Escala</Nav.Link>
          </LinkContainer>
					<LinkContainer to="/baterponto">
            <Nav.Link>Bater Ponto</Nav.Link>
          </LinkContainer>
					<NavDropdown title="Modificar" id="collasible-nav-dropdown">
						<LinkContainer to="/modificar/bloco">
							<NavDropdown.Item>Bloco</NavDropdown.Item>
						</LinkContainer>
						<LinkContainer to="/modificar/unidade">
							<NavDropdown.Item>Unidade</NavDropdown.Item>
						</LinkContainer>
						<NavDropdown.Divider />
						<LinkContainer to="/modificar/categoria-profissional">
							<NavDropdown.Item>Categoria Profissional</NavDropdown.Item>
						</LinkContainer>
						<LinkContainer to="/modificar/funcionario">
							<NavDropdown.Item>Funcionário</NavDropdown.Item>
						</LinkContainer>
						<LinkContainer to="/modificar/vinculo">
							<NavDropdown.Item>Vínculo</NavDropdown.Item>
						</LinkContainer>
						<NavDropdown.Divider />
						<LinkContainer to="/modificar/escala">
							<NavDropdown.Item>Escala</NavDropdown.Item>
						</LinkContainer>
					</NavDropdown>
				</Nav>
				<Nav>
				<NavDropdown title="Logado" id="collasible-nav-dropdown">
					<NavDropdown.Divider />
          <LinkContainer to="/logout">
            <NavDropdown.Item>Sair</NavDropdown.Item>
          </LinkContainer>
				</NavDropdown>
				</Nav>
			</Navbar.Collapse>}
    </Container>
		</Navbar>	
  )
}