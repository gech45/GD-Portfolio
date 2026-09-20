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
  const touchStartY = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  useEffect(() => {
    const navigateToAdjacentPage = (direction) => {
      const currentIndex = scrollPages.indexOf(location.pathname)
      const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      const reachedTop = window.scrollY <= 2
      const canNavigate = direction === 'down'
        ? reachedBottom && currentIndex < scrollPages.length - 1
        : reachedTop && currentIndex > 0

      if (currentIndex === -1 || isNavigating.current || !canNavigate) return

      const nextIndex = currentIndex + (direction === 'down' ? 1 : -1)
      isNavigating.current = true
      navigate(scrollPages[nextIndex])
      window.clearTimeout(unlockTimer.current)
      unlockTimer.current = window.setTimeout(() => {
        isNavigating.current = false
      }, 600)
    }

    const handleWheel = (event) => {
      navigateToAdjacentPage(event.deltaY > 0 ? 'down' : 'up')
    }

    const handleTouchStart = (event) => {
      touchStartY.current = event.changedTouches[0].clientY
    }

    const handleTouchEnd = (event) => {
      if (touchStartY.current === null) return

      const touchDelta = touchStartY.current - event.changedTouches[0].clientY
      touchStartY.current = null

      if (Math.abs(touchDelta) < 60) return
      navigateToAdjacentPage(touchDelta > 0 ? 'down' : 'up')
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
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
