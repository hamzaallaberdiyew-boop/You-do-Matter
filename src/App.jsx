import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './supabase'
import WriteBox from './components/WriteBox'
import StoryList from './components/StoryList'
import HelpBox from './components/HelpBox'

function App() {
  const [stories, setStories] = useState([])

  async function loadStories() {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
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

  async function addStory(text, topic) {
  const { error } = await supabase
    .from('stories')
    .insert({ text: text, topic: topic })

  if (error) {
    console.log(error)
    return
  }

  loadStories()
}

  return (
    <main>
      <h1>You do matter</h1>
      <p>Write what's on your mind. You are not alone.</p>
      <HelpBox />
      <WriteBox onShare={addStory} />
      <StoryList stories={stories} />
    </main>
  )
}

export default App