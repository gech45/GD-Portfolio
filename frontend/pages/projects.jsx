import { useEffect, useState } from 'react'
import { apiUrl } from '../src/api.js'
import '../styles/Projects.css'

const colorPalette = ['coral', 'blue', 'yellow', 'mint', 'orange']

function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch(`${apiUrl}/projects`)
        if (!response.ok) throw new Error('Could not load projects')

        const data = await response.json()
        setProjects(data)
      } catch {
        setProjects([])
      }
    }

    loadProjects()
  }, [])

  return (
    <main className='page-content inner-page projects-page'>
      <h1>Selected Works</h1>
      

      <div className='project-list'>
        {projects.map((project, index) => (
          <article className={`project-card ${project.color || colorPalette[index % colorPalette.length]}`} key={project.id}>
            <div className='project-info'>
              <div className='project-copy'>
                <div className='project-heading'>
                  <p className='project-meta'>{project.type}</p>
                  <span className='project-number'>{project.number || String(index + 1).padStart(2, '0')}</span>
                </div>
                <h2>{project.name}</h2>
                <div className='project-links'>
                  <a className='text-link' href={project.appLink} target='_blank' rel='noreferrer'>View project ↗</a>
                  <a className='text-link' href={project.githubLink} target='_blank' rel='noreferrer'>GitHub ↗</a>
                </div>
              </div>
              <div className='project-description-card'>
                <p>{project.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Projects