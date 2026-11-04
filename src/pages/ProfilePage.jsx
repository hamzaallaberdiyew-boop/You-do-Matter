import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'
import { getToken, getMyStories, removeMyStory } from '../myStories'
import UsernameBox from '../components/UsernameBox'
import './ProfilePage.css'

function ProfilePage({ user }) {
  const [stories, setStories] = useState([])

  async function loadMine() {
    const ids = getMyStories()
    let list = []

    if (ids.length > 0) {
      const { data, error } = await supabase
        .from('stories')
        .select('id, text, topic, heart, hug, metoo, author_name')
        .in('id', ids)

      if (error) {
        console.log(error)
      } else {
        list = data
      }
    }

    if (user) {
      const { data, error } = await supabase.rpc('my_stories')

      if (error) {
        console.log(error)
      } else {
        data.forEach((s) => {
          const alreadyThere = list.some((x) => x.id === s.id)
          if (!alreadyThere) {
            list.push(s)
          }
        })
      }
    }

    list.sort((a, b) => b.id - a.id)
    setStories(list)
  }

  useEffect(() => {
    loadMine()
  }, [user])

  async function deleteStory(id) {
    const sure = window.confirm('Delete this story? This cannot be undone.')
    if (!sure) return

    const { error } = await supabase.rpc('delete_my_story', {
      story_id: id,
      token: getToken(),
    })

    if (error) {
      console.log(error)
      return
    }

    removeMyStory(id)
    loadMine()
  }

  let totalReactions = 0
  stories.forEach((s) => {
    totalReactions += s.heart + s.hug + s.metoo
  })

  return (
    <main>
      <h1>My stories</h1>

      {user ? (
        <>
          <UsernameBox user={user} />
          <p className="profile-note">
            Stories you post while signed in are saved to your account, so you
            can see and delete them on any device.
          </p>
        </>
      ) : (
        <p className="profile-note">
          You are not signed in, so this page only shows stories written on this
          device. <Link to="/signin">Sign in</Link> or{' '}
          <Link to="/signup">create an account</Link> to keep your stories on
          every device. You can always write without one.
        </p>
      )}

      <div className="profile-stats">
        <div>
          <strong>{stories.length}</strong>
          <span>stories</span>
        </div>
        <div>
          <strong>{totalReactions}</strong>
          <span>reactions received</span>
        </div>
      </div>

      {stories.length === 0 && (
        <p className="empty">You haven't shared a story yet.</p>
      )}

      {stories.map((s) => (
        <article className="story" key={s.id}>
          <div className="story-top">
            <span className="topic-label">{s.topic}</span>
            <span className="story-meta">
              <span className="story-author">{s.author_name || 'Anonymous'}</span>
              <button
                type="button"
                className="trash-btn"
                onClick={() => deleteStory(s.id)}
                aria-label="Delete my story"
                title="Delete my story"
              >
                🗑️
              </button>
            </span>
          </div>
          <p>{s.text}</p>
          <p className="profile-counts">
            ❤️ {s.heart} &nbsp; 🤗 {s.hug} &nbsp; 🤝 {s.metoo}
          </p>
        </article>
      ))}
    </main>
  )
}

export default ProfilePage