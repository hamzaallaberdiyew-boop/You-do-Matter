import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { supabase } from './supabase'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import HelpPage from './pages/HelpPage'
import RulesPage from './pages/RulesPage'
import ProfilePage from './pages/ProfilePage'
import AboutPage from './pages/AboutPage'
import SupportPage from './pages/SupportPage'
import AuthPage from './pages/AuthPage'
import AdminPage from './pages/AdminPage'

function App() {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => data.subscription.unsubscribe()
  }, [])

    useEffect(() => {
  async function checkAdmin() {
    if (!user) {
      setIsAdmin(false)
      return
    }

    const { data } = await supabase.rpc('is_admin')
    setIsAdmin(data === true)
  }

  checkAdmin()
}, [user])

  return (
    <>
      <Navbar user={user} isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<HomePage user={user} isAdmin={isAdmin} />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/signin" element={<AuthPage mode="signin" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/admin" element={<AdminPage user={user} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App