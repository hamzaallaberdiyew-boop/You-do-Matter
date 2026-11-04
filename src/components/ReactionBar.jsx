import { useState, useRef } from 'react'
import { supabase } from '../supabase'
import './ReactionBar.css'

const options = [
  { kind: 'heart', emoji: '❤️', label: 'Heart' },
  { kind: 'hug', emoji: '🤗', label: 'Hug' },
  { kind: 'metoo', emoji: '🤝', label: 'Me too' },
]

function ReactionButton({ story, option, onReact }) {
  const busy = useRef(false)
  const storageKey = 'given-' + story.id + '-' + option.kind
  const [given, setGiven] = useState(localStorage.getItem(storageKey) === 'true')

  async function handleClick() {
  if (busy.current) return
  busy.current = true

  const functionName = given ? 'unreact' : 'react'

  const { error } = await supabase.rpc(functionName, {
    story_id: story.id,
    reaction: option.kind,
  })

  if (error) {
    console.log(error)
  } else {
    const newValue = !given
    setGiven(newValue)
    localStorage.setItem(storageKey, newValue)
    await onReact()
  }

  busy.current = false
}

  return (
    <button
      type="button"
      className={given ? 'reaction reaction-on' : 'reaction'}
      onClick={handleClick}
      aria-label={option.label}
      title={option.label}
    >
      <span>{option.emoji}</span> <span>{story[option.kind]}</span>
    </button>
  )
}

function ReactionBar({ story, onReact }) {
  return (
    <div className="reaction-bar">
      {options.map((o) => (
        <ReactionButton key={o.kind} story={story} option={o} onReact={onReact} />
      ))}
    </div>
  )
}

export default ReactionBar