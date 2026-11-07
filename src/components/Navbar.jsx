import { NavLink } from 'react-router-dom'
import { supabase } from '../supabase'
import './Navbar.css'
import ThemeToggle from './ThemeToggle'

function Navbar({ user, isAdmin }) {
  return (
    <nav className="navbar">
      <span className="nav-brand">You do matter</span>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/help">Help</NavLink>
        <NavLink to="/rules">Rules</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        {isAdmin && <NavLink to="/admin">Admin</NavLink>}
        {user ? (
          <button
            type="button"
            className="nav-signout"
            onClick={() => supabase.auth.signOut()}
          >
            Sign out
          </button>
        ) : (
          <NavLink to="/signin">Sign in</NavLink>
        )}
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar