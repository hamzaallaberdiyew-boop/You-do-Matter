import { useState } from 'react'
import { Link } from 'react-router-dom'
import { countries } from '../countries'

function HelpPage() {
  const [search, setSearch] = useState('')

  const results = countries.filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main>
      <Link to="/">← Back</Link>
      <h1>Find help</h1>
      <p>Choose your country. Helplines are free and confidential.</p>

      <input
        className="search"
        type="text"
        placeholder="Type your country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="country-list">
        {results.map(([name, code]) => (
          <li key={code}>
            <a
              href={`https://findahelpline.com/countries/${code}`}
              target="_blank"
              rel="noreferrer"
            >
              {name}
            </a>
          </li>
        ))}
      </ul>

      {results.length === 0 && <p>No country found. Check the spelling.</p>}

      <p>If you are in immediate danger, call your local emergency number.</p>
    </main>
  )
}

export default HelpPage