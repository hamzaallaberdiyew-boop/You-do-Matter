import { Link } from 'react-router-dom'

function SupportPage() {
  return (
    <main>
      <h1>Support</h1>

      <h2>If you need help right now</h2>
      <p>
        Please go to the <Link to="/help">Help page</Link> to find a free
        helpline in your country. You do not have to handle this alone.
      </p>

      <h2>Contact us</h2>
      <p>
        Found a problem, have an idea, or want to tell us about a story that
        should not be here? Write to us:
      </p>
      <p>
        <a href="mailto:your-email@example.com">your-email@example.com</a>
      </p>
    </main>
  )
}

export default SupportPage