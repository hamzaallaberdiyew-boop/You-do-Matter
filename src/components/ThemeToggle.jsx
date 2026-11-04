import { useState } from 'react'
import { getTheme } from '../theme'

function ThemeToggle() {
  const [theme, setTheme] = useState(getTheme)

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    localStorage.setItem('theme', next)
    setTheme(next)
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label="Switch between dark and light mode"
      title="Switch between dark and light mode"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggle