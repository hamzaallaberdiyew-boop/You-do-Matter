import './HelpBox.css'
import { Link } from 'react-router-dom'

function HelpBox() {
  return (
    <aside className="help-box">
      <strong>Need to talk to someone right now?</strong>
      <p>If you are in immediate danger, call your local emergency number.</p>
      <Link to="/help">Find a helpline in your country</Link>
    </aside>
  )
}

export default HelpBox