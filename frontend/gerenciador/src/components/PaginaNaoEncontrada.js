import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'

const example = (
  <div>
    <h3>Ops... Error 404</h3>
  </div>
)

function PaginaNaoEncontrada() {
  return (
    ReactDOM.render(
      example,
      document.getElementById('root')
    )
  )
}

export default withRouter(PaginaNaoEncontrada)
