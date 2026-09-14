import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import '../styles/App.css'
import About from '../pages/About.jsx'
import ContactMe from '../pages/contact_me.jsx'
import Projects from '../pages/projects.jsx'
import Home from '../pages/Home.jsx'
import Admin from '../pages/Admin.jsx'

const scrollPages = ['/', '/about', '/projects', '/contact']
function ScrollPageNavigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const isNavigating = useRef(false)
  const unlockTimer = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  useEffect(() => {
    const handleWheel = (event) => {
      const currentIndex = scrollPages.indexOf(location.pathname)
      const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      const reachedTop = window.scrollY <= 2

      if (currentIndex === -1 || isNavigating.current) return

      const scrollingDown = event.deltaY > 0
      const scrollingUp = event.deltaY < 0
      const canNavigateDown = scrollingDown && reachedBottom && currentIndex < scrollPages.length - 1
      const canNavigateUp = scrollingUp && reachedTop && currentIndex > 0

      if (!canNavigateDown && !canNavigateUp) return

      const nextIndex = currentIndex + (canNavigateDown ? 1 : -1)
      const nextPage = scrollPages[nextIndex]

      isNavigating.current = true
      navigate(nextPage)
      window.clearTimeout(unlockTimer.current)
      unlockTimer.current = window.setTimeout(() => {
        isNavigating.current = false
      }, 600)
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [location.pathname, navigate])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollPageNavigation />
      <div className='page'>
        <header className='site-header'>
          <Link className='brand' to="/" aria-label="Getachew Dargie home">GETACHEW DARGIE<span>.</span></Link>
          
          <nav className='nav' aria-label='Main navigation'>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/projects">Work</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          <a className='header-availability' href="mailto:getachewdargie3721@gmail.com">Available for work</a>
          <NavLink className='admin-link' to="/admin">Admin</NavLink>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactMe />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <footer className='site-footer'><span>GD / Digital craft &amp; thoughtful code</span><span>Based in Addis Ababa, Ethiopia</span></footer>
      </div>
    </BrowserRouter>
  )
}

export default App
