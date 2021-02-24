import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Row, Container } from 'react-bootstrap'
//import StickyFooter from 'react-sticky-footer';

const DevelopersName = [ 'André Henrique Mendes', 'Gaspar Andrade', 'Igor Fonseca Nogueira' ]

function GetDevelopersName(names) {
  let ret = ""
  for (var i = 0; i < names.length; i++) {
    ret += names[i]
    if (i < names.length - 2) ret += ", "
    else if (names.length > 1 && names.length - 2 === i) ret += " e "
  }
  return ret
}

function Footer() {
  return (
    <div className="Footer">
    <Container fluid className="fixed-bootom">
      <Row className="h-25">
        <Col>
          <Row className="justify-content-md-center">
            Desenvolvido por: {GetDevelopersName(DevelopersName)}
          </Row>
        </Col>
        <Col>
          <Row className="justify-content-md-center">
            Site desenvolvido para UC de Engenharia de Software, UNIFESP - ICT.
          </Row>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Footer
