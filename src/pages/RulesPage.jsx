import './RulesPage.css'

function RulesPage() {
  return (
    <main>
      <h1>Community rules</h1>
      <p>This is a place to feel less alone. Please help keep it safe.</p>

      <ol className="rules-list">
        <li>
          <strong>Be kind.</strong> Everyone here is carrying something.
          No insults, mocking, or harassment.
        </li>
        <li>
          <strong>No methods or details of self-harm.</strong> You can say
          how you feel, but please don't describe how to hurt yourself.
        </li>
        <li>
          <strong>Keep your privacy.</strong> Don't share names, phone
          numbers, addresses, or social media accounts, yours or anyone else's.
        </li>
        <li>
          <strong>No ads, links, or spam.</strong>
        </li>
        <li>
          <strong>No hate.</strong> Nothing against people for who they are.
        </li>
        <li>
          <strong>This is peer support, not therapy.</strong> We can't replace
          a doctor, a counselor, or emergency help.
        </li>
      </ol>

      <p>
        Stories that break these rules may be hidden. If you are in danger
        right now, please open the Help page.
      </p>
    </main>
  )
}

export default RulesPage