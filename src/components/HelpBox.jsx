import './HelpBox.css'
import { Link } from 'react-router-dom'

function HelpBox() {
  return (
    <aside className="help-box">
      <strong>Need to talk to someone right now?</strong>
      <ul>
        <li>US: call or text 988</li>
        <li>South Korea: call 109</li>
        <li>
          Anywhere else:{' '}
          <a href="https://findahelpline.com" target="_blank" rel="noreferrer">
            findahelpline.com
          </a>
        </li>
      </ul>
      <p>If you are in immediate danger, call your local emergency number.</p>
      <Link to="/help">Find a helpline in your country</Link>
    </aside>
  )
}

export default HelpBox