import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'
import './AdminPage.css'

function AdminPage({ user }) {
  const [isAdmin, setIsAdmin] = useState(null)
  const [items, setItems] = useState([])

  async function loadReports() {
  const { data, error } = await supabase
    .from('stories')
    .select('id, text, topic, hidden, report_count')
    .gt('report_count', 0)
    .order('report_count', { ascending: false })

  if (error) {
    console.log(error)
    return
  }
  setItems(data)
}

  useEffect(() => {
    async function check() {
      if (!user) {
        setIsAdmin(false)
        return
      }

      const { data } = await supabase.rpc('is_admin')
      setIsAdmin(data === true)
      if (data === true) loadReports()
    }

    check()
  }, [user])

  async function removeStory(id) {
  const sure = window.confirm('Delete this story forever? This cannot be undone.')
  if (!sure) return

  const { error } = await supabase.from('stories').delete().eq('id', id)

  if (error) console.log(error)
  loadReports()
}

  async function dismiss(id) {
  const { error } = await supabase
    .from('stories')
    .update({ report_count: 0 })
    .eq('id', id)

  if (error) console.log(error)
  loadReports()
}

  if (isAdmin === null) {
    return <main><p>Checking...</p></main>
  }

  if (!isAdmin) {
    return (
      <main>
        <h1>Admin</h1>
        {!user ? (
          <p>
            Please <Link to="/signin">sign in</Link> first.
          </p>
        ) : (
          <p>This page is only for admins.</p>
        )}
      </main>
    )
  }

  return (
    <main>
      <h1>Admin</h1>
      <p className="admin-note">Reported stories, most reported first.</p>

      {items.length === 0 && <p>No reports. All quiet.</p>}

      {items.map((s) => (
        <article className="story" key={s.id}>
          <div className="story-top">
            <span className="topic-label">{s.topic}</span>
            <span className="admin-count">
              {s.report_count} report{s.report_count === 1 ? '' : 's'}
              {s.hidden && ' · hidden'}
            </span>
          </div>
          <p>{s.text}</p>
          <div className="admin-actions">
            <button type="button" onClick={() => dismiss(s.id)}>
            Dismiss reports
            </button>
            <button type="button" className="admin-delete" onClick={() => removeStory(s.id)}>
            Delete
            </button>
          </div>
        </article>
      ))}
    </main>
  )
}

export default AdminPage