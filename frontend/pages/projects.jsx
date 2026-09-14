import { useEffect, useState } from 'react'
import portfolioImage from '../images/image2.png'
import { apiUrl, imageUrl } from '../src/api.js'

function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch(`${apiUrl}/projects`)
        if (!response.ok) throw new Error('Could not load projects')

        const data = await response.json()
        const projectsWithImages = data.map((project) => ({
          ...project,
          image: imageUrl(project.image) || portfolioImage,
        }))
        setProjects(projectsWithImages)
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
        {projects.map((project) => (
          <article className='project-card' key={project.id}>
            <div className={`project-visual ${project.color}`}>
              <img src={project.image} alt={project.name} className='project-image' onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = portfolioImage }} />
              <span>{project.number}</span>
              <strong>{project.name.split(' ')[0]}</strong>
            </div>
            <div className='project-info'>
              <p className='project-meta'>{project.type}</p>
              <h2>{project.name}</h2>
              <p>{project.description}</p>

              <div className='project-links'>
                <a className='text-link' href={project.appLink} target='_blank' rel='noreferrer'>View project ↗</a>
                <a className='text-link' href={project.githubLink} target='_blank' rel='noreferrer'>GitHub ↗</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Projects