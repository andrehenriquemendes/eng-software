import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Footer from './components/Footer.js'
import App from './components/App/App.js'

const routing = (
    <Router>
      <div className='App'>
      <App />
      </div>
      <Footer />
    </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
)
