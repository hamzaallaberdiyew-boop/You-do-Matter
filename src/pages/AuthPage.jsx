import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import './AuthPage.css'

function AuthPage({ mode }) {
  const isSignUp = mode === 'signup'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')

    if (isSignUp && password !== repeat) {
      setMessage('The two passwords do not match.')
      return
    }

    let result
    if (isSignUp) {
      result = await supabase.auth.signUp({
        email: email,
        password: password,
        options: { emailRedirectTo: window.location.origin },
      })
    } else {
      result = await supabase.auth.signInWithPassword({ email, password })
    }

    if (result.error) {
      setMessage(result.error.message)
      return
    }

    if (isSignUp && !result.data.session) {
      setMessage('Check your email to confirm your account.')
      return
    }

    navigate('/profile')
  }

  return (
    <main className="auth-page">
      <h1>{isSignUp ? 'Create an account' : 'Sign in'}</h1>
      <p>
        You never need an account to write. An account lets you keep your
        stories together on any device and, soon, choose a username.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isSignUp ? 'new-password' : 'current-password'}
          minLength={6}
          required
        />

        {isSignUp && (
          <>
            <label htmlFor="repeat">Repeat password</label>
            <input
              id="repeat"
              type="password"
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              autoComplete="new-password"
              required
            />
          </>
        )}

        <button type="submit">
          {isSignUp ? 'Create account' : 'Sign in'}
        </button>

        {message && <p className="auth-message">{message}</p>}
      </form>

      {isSignUp ? (
        <p>
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      ) : (
        <p>
          New here? <Link to="/signup">Create an account</Link>
        </p>
      )}
    </main>
  )
}

export default AuthPage