function StoryList({ stories }) {
  if (stories.length === 0) {
    return <p className="empty">No stories yet. Be the first to write one.</p>
  }

  return (
    <section>
      <h2>Others are writing too</h2>
      {stories.map((s) => (
        <article className="story" key={s.id}>
            <span className="topic-label">{s.topic}</span>
            <p>{s.text}</p>
        </article>
      ))}
    </section>
  )
}

export default StoryList