import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { getToken, addMyStory } from '../myStories'
import WriteBox from '../components/WriteBox'
import StoryList from '../components/StoryList'
import HelpBox from '../components/HelpBox'

function HomePage({ user, isAdmin }) {
  const [stories, setStories] = useState([])
  const [username, setUsername] = useState(null)

  async function loadStories() {
    const { data, error } = await supabase
      .from('stories')
      .select('id, text, topic, created_at, heart, hug, metoo, author_name')
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error)
      return
    }
    setStories(data)
  }

  useEffect(() => {
    loadStories()
  }, [])

  useEffect(() => {
    async function loadUsername() {
      if (!user) {
        setUsername(null)
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .maybeSingle()

      setUsername(data ? data.username : null)
    }

    loadUsername()
  }, [user])

  async function addStory(text, topic, asName) {
    const row = { text: text, topic: topic, owner_token: getToken() }

    if (user) {
      row.user_id = user.id
      if (asName && username) {
        row.author_name = username
      }
    }

    const { data, error } = await supabase
      .from('stories')
      .insert(row)
      .select('id')

    if (error) {
      console.log(error)
      return
    }

    addMyStory(data[0].id)
    loadStories()
  }

  return (
    <main>
      <h1>You do matter</h1>
      <p>Write what's on your mind. You are not alone.</p>
      <HelpBox />
      <WriteBox onShare={addStory} user={user} username={username} />
      <StoryList stories={stories} onReact={loadStories} isAdmin={isAdmin} />
    </main>
  )
}

export default HomePage