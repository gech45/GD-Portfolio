import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import '../styles/App.css'
import About from '../pages/About.jsx'
import ContactMe from '../pages/contact_me.jsx'
import Projects from '../pages/projects.jsx'
import Home from '../pages/Home.jsx'
import Admin from '../pages/Admin.jsx'

function App() {
  return (
    <BrowserRouter>
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
