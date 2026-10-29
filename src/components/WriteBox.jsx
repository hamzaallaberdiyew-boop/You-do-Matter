import { useState } from 'react'

const topics = [
  'Loneliness',
  'Study',
  'Family',
  'Friends',
  'Relationships',
  'Work',
  'Grief',
  'Other',
]

function WriteBox({ onShare }) {
  const [text, setText] = useState('')
  const [topic, setTopic] = useState('Other')
  const [customTopic, setCustomTopic] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return

    let finalTopic = topic
    if (topic === 'custom') {
      finalTopic = customTopic.trim() || 'Other'
    }

    onShare(text.trim(), finalTopic)
    setText('')
    setTopic('Other')
    setCustomTopic('')
  }

  return (
    <form className="write-box" onSubmit={handleSubmit}>
      <label htmlFor="story">What's weighing on you today?</label>
      <textarea
        id="story"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start anywhere. It doesn't have to make sense."
        maxLength={1500}
      />

      <p className="topic-title">Choose a topic (optional)</p>
      <div className="topic-chips">
        {topics.map((t) => (
          <button
            key={t}
            type="button"
            className={topic === t ? 'chip chip-on' : 'chip'}
            onClick={() => setTopic(t)}
          >
            {t}
          </button>
        ))}
        <button
          type="button"
          className={topic === 'custom' ? 'chip chip-on' : 'chip'}
          onClick={() => setTopic('custom')}
        >
          Write my own
        </button>
      </div>

      {topic === 'custom' && (
        <input
          type="text"
          value={customTopic}
          onChange={(e) => setCustomTopic(e.target.value)}
          placeholder="Your topic (up to 30 characters)"
          maxLength={30}
        />
      )}

      <button type="submit">Share anonymously</button>
    </form>
  )
}

export default WriteBox