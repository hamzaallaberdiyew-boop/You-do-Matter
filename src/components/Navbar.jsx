import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <span className="nav-brand">You do matter</span>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/help">Help</NavLink>
        <NavLink to="/rules">Rules</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
    </nav>
  )
}

export default Navbar