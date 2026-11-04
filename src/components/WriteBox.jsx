import { useState } from 'react';
import './WriteBox.css'
import { topics } from '../topics'
import { Link } from 'react-router-dom'
import { needsCare } from '../crisisWords'

function WriteBox({ onShare, user, username }) {
  const [text, setText] = useState('')
  const [topic, setTopic] = useState('Other')
  const [customTopic, setCustomTopic] = useState('')
  const [asName, setAsName] = useState(false)
  const [showCare, setShowCare] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return

    let finalTopic = topic
    if (topic === 'custom') {
      finalTopic = customTopic.trim() || 'Other'
    }

    const written = text.trim()
    onShare(written, finalTopic, asName)
    if (needsCare(written)) {
    setShowCare(true)
    }
    setText('')
    setTopic('Other')
    setCustomTopic('')
    setAsName(false)
  }

  return (
    <><form className="write-box" onSubmit={handleSubmit}>
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
      {username && (
        <label className="name-choice">
            <input
            type="checkbox"
            checked={asName}
            onChange={(e) => setAsName(e.target.checked)}
            />
            Post as <strong>{username}</strong> (otherwise it shows as Anonymous)
        </label>
        )}

        {user && !username && (
        <p className="name-hint">
            Want to post under a name? <Link to="/profile">Choose a username</Link>.
        </p>
        )}

      <button type="submit">Share anonymously</button>
    </form>

    {showCare && (
        <div className="care-box" role="status">
            <h3>Thank you for writing this.</h3>
            <p>
            It sounds like you are going through something really painful. Your
            story is shared, and you do not have to carry this alone.
            </p>
            <p>Talking to someone right now can help:</p>
            <ul>
            <li>US: call or text <strong>988</strong></li>
            <li>South Korea: call <strong>109</strong></li>
            <li>
                Anywhere else: <Link to="/help">find a helpline in your country</Link>
            </li>
            </ul>
            <p className="care-small">
            In immediate danger? Call your local emergency number.
            </p>
            <button type="button" onClick={() => setShowCare(false)}>
            Close
            </button>
        </div>
        )}
</>
    
  )
}

export default WriteBox