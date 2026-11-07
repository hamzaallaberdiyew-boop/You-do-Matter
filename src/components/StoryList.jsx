import { useState } from 'react'
import './StoryList.css'
import ReactionBar from './ReactionBar'
import { topics, groupOf } from '../topics'
import { supabase } from '../supabase'
import { getToken, getMyStories, removeMyStory } from '../myStories'

function formatDate(isoString) {
  const date = new Date(isoString)
  const now = new Date()

  const yesterday = new Date()
  yesterday.setDate(now.getDate() - 1)

  const time = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

  if (date.toDateString() === now.toDateString()) {
    return time
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday, ' + time
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function StoryList({ stories, onReact, isAdmin }) {
  const [filter, setFilter] = useState('All')
  const [reported, setReported] = useState(() =>
  JSON.parse(localStorage.getItem('reportedStories') || '[]')
)

  const myStories = getMyStories()

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
  onReact()
}

async function reportStory(id) {
  if (reported.includes(id)) return

  const updated = [...reported, id]
  setReported(updated)
  localStorage.setItem('reportedStories', JSON.stringify(updated))

  const { error } = await supabase.rpc('report_story', { target_id: id })

  if (error) {
    console.log(error)
    const undone = updated.filter((x) => x !== id)
    setReported(undone)
    localStorage.setItem('reportedStories', JSON.stringify(undone))
  }
}

  if (stories.length === 0) {
    return <p className="empty">No stories yet. Be the first to write one.</p>
  }

  const shown = stories.filter((s) => {
  if (filter === 'All') return true
  return groupOf(s.topic) === filter
})

  return (
    <section>
      <h2>Others are writing too</h2>

      <div className="filter-bar">
        {['All', ...topics].map((t) => (
          <button
            key={t}
            type="button"
            className={filter === t ? 'chip chip-on' : 'chip'}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="empty">No stories with this topic yet.</p>
      )}

      {shown.map((s) => (
        <article className="story" key={s.id}>
          <div className="story-top">
            <span className="topic-label">{s.topic}</span>
             <span className="story-meta">
                <span className="story-author">{s.author_name || 'Anonymous'}</span>
                <span className="story-date">{formatDate(s.created_at)}</span>
                {(myStories.includes(s.id) || isAdmin) && (
                <button
                    type="button"
                    className="trash-btn"
                    onClick={() => deleteStory(s.id)}
                    aria-label="Delete my story"
                    title="Delete my story"
                >
                    <span className="story-meta">
</span>
                    🗑️
                </button>
                )}
            </span>
            </div>
          <p>{s.text}</p>
          <div className="story-bottom">
            <ReactionBar story={s} onReact={onReact} />
            {reported.includes(s.id) ? (
                <span className="reported">Thank you, we will look at it.</span>
            ) : (
                <button type="button" className="report-btn" onClick={() => reportStory(s.id)}>
                Report
                </button>
            )}
        </div>
        </article>
      ))}
    </section>
  )
}

export default StoryList