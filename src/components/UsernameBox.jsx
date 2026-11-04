import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import './UsernameBox.css'

function UsernameBox({ user }) {
  const [username, setUsername] = useState(null)
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .maybeSingle()

      if (error) {
        console.log(error)
      } else if (data) {
        setUsername(data.username)
      }
      setLoading(false)
    }

    loadProfile()
  }, [user.id])

  async function saveUsername(e) {
    e.preventDefault()
    setMessage('')

    const name = input.trim()
    const { error } = await supabase
      .from('profiles')
      .insert({ id: user.id, username: name })

    if (error) {
      console.log(error)
      if (error.code === '23505') {
        setMessage('This username is already taken. Try another one.')
      } else if (error.code === '23514') {
        setMessage('Use 3 to 20 letters, numbers, or underscores. Some names are reserved.')
      } else {
        setMessage('Something went wrong. Please try again.')
      }
      return
    }

    setUsername(name)
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (username) {
    return (
      <div className="username-box">
        <p>
          Your username: <strong>{username}</strong>
        </p>
        <p className="username-note">
          You can use it when you choose to post under your name. Posting
          anonymously is always your choice.
        </p>
      </div>
    )
  }

  return (
    <form className="username-box" onSubmit={saveUsername}>
      <label htmlFor="username">Choose a username</label>
      <p className="username-note">
        Please do not use your real name. A made-up name keeps you safe.
        3 to 20 letters, numbers, or underscores.
      </p>
      <input
        id="username"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        minLength={3}
        maxLength={20}
        pattern="[A-Za-z0-9_]+"
        required
      />
      <button type="submit">Save username</button>
      {message && <p className="username-message">{message}</p>}
    </form>
  )
}

export default UsernameBox