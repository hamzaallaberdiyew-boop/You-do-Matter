import { Link } from 'react-router-dom'
import './Footer.css'

function Footer({ user }) {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/support">Support</Link>
        {!user && (
          <>
            <Link to="/signin">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
      <p>In immediate danger? Call your local emergency number.</p>
    </footer>
  )
}

export default Footer