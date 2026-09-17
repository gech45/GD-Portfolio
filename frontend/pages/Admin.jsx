import { useEffect, useState } from 'react'
import { apiUrl } from '../src/api.js'
import '../styles/Admin.css'

const colorPalette = ['coral', 'blue', 'yellow', 'mint', 'orange']
const emptyProject = { name: '', type: '', description: '', color: 'coral', appLink: '', githubLink: '' }

function Admin() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [projects, setProjects] = useState([])
  const [project, setProject] = useState(emptyProject)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')

  async function loadProjects() {
    const response = await fetch(`${apiUrl}/projects`)
    if (!response.ok) throw new Error('Could not load projects')
    return response.json()
  }

  useEffect(() => {
    loadProjects()
      .then(setProjects)
      .catch(() => setMessage('Could not load projects.'))
  }, [])

  async function login(event) {
    event.preventDefault()
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    if (!response.ok) return setMessage('Invalid email or password.')
    setLoggedIn(true)
    setMessage('')
  }

  async function saveProject(event) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', project.name)
    formData.append('type', project.type)
    formData.append('description', project.description)
    const color = editingId ? project.color : colorPalette[projects.length % colorPalette.length]
    formData.append('color', color)
    formData.append('appLink', project.appLink)
    formData.append('githubLink', project.githubLink)

    const projectPath = editingId ? `/projects/${editingId}` : '/projects'
    const response = await fetch(`${apiUrl}${projectPath}`, {
      method: editingId ? 'PUT' : 'POST',
      credentials: 'include',
      body: formData,
    })
    if (!response.ok) return setMessage('Your session expired. Please sign in again.')
    setProject(emptyProject)
    setEditingId(null)
    setMessage('Project saved.')
    loadProjects().then(setProjects).catch(() => setMessage('Project saved, but the list could not refresh.'))
  }

  async function removeProject(id) {
    const response = await fetch(`${apiUrl}/projects/${id}`, { method: 'DELETE', credentials: 'include' })
    if (response.ok) setProjects(projects.filter((item) => item.id !== id))
  }

  async function logout() {
    await fetch(`${apiUrl}/auth/logout`, { method: 'POST', credentials: 'include' })
    setLoggedIn(false)
  }

  if (!loggedIn) return (
    <main className='page-content inner-page admin-page'>
      <p className='eyebrow'>Private area</p>
      <h1>Project <em>admin.</em></h1>
      <form className='admin-form' onSubmit={login}>
        <label>Email<input type='email' required value={credentials.email} onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} /></label>
        <label>Password<input type='password' required value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} /></label>
        <button className='button button-dark' type='submit'>Sign in <span>↗</span></button>
        {message && <p className='form-message'>{message}</p>}
      </form>
    </main>
  )

  return (
    <main className='page-content inner-page admin-page'>
      <div className='admin-heading'><div><p className='eyebrow'>Private area</p><h1>Manage <em>projects.</em></h1></div><button className='text-link admin-logout' onClick={logout}>Log out</button></div>
      <form className='admin-form project-form' onSubmit={saveProject}>
        <label>Name<input required value={project.name} onChange={(event) => setProject({ ...project, name: event.target.value })} /></label>
        <label>Type<input required value={project.type} onChange={(event) => setProject({ ...project, type: event.target.value })} /></label>
        <label>Description<textarea required value={project.description} onChange={(event) => setProject({ ...project, description: event.target.value })} /></label>
        <label>Live URL<input type='url' value={project.appLink} onChange={(event) => setProject({ ...project, appLink: event.target.value })} /></label>
        <label>GitHub URL<input type='url' value={project.githubLink} onChange={(event) => setProject({ ...project, githubLink: event.target.value })} /></label>
        <button className='button button-dark' type='submit'>{editingId ? 'Update project' : 'Add project'} <span>↗</span></button>
        {message && <p className='form-message'>{message}</p>}
      </form>
      <div className='admin-projects'>{projects.map((item) => <article className='admin-project' key={item.id}><div><strong>{item.name}</strong><p>{item.type}</p></div><div className='project-links'><button className='text-link' type='button' onClick={() => { setProject({ name: item.name, type: item.type, description: item.description, color: item.color, appLink: item.appLink, githubLink: item.githubLink }); setEditingId(item.id) }}>Edit</button><button className='text-link danger' type='button' onClick={() => removeProject(item.id)}>Delete</button></div></article>)}</div>
    </main>
  )
}

export default Admin