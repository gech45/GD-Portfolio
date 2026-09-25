import '../styles/About.css'

const skills = [
  { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/171717' },
  { name: 'Express.js', logo: 'https://cdn.simpleicons.org/express/171717' },
  { name: 'Git & GitHub', logo: 'https://cdn.simpleicons.org/github/171717' },
]

function About() {
  return (
    <main className='page-content inner-page about-page'>
      <div className='about-me'> 
      <h1>About Me</h1>
      <p> I’m a Full-Stack Developer specializing in building modern, scalable, secure, and user-friendly web applications. My technical expertise spans JavaScript, TypeScript, React, Next.js, HTML, CSS, Node.js, Express, RESTful APIs, MySQL, PostgreSQL, authentication, Git, GitHub, testing, cloud deployment, and modern software development practices. I build complete applications from responsive and interactive frontends to robust backend systems and well-structured databases. I value clean, maintainable code, thoughtful architecture, performance, security, and exceptional user experiences, with a strong focus on transforming ideas and real-world problems into reliable, production-ready software.

   </p>
  </div> 
  <div className='skills'>
    <h1>My Skills</h1>
    {skills.map((skill) => (
      <button className='skill-button' key={skill.name} type='button'>
        <img className='skill-logo' src={skill.logo} alt='' aria-hidden='true' />
        {skill.name}
      </button>
    ))}
  </div>

      <div className='about-layout'>      
        <div className='details'>
          <div>
            <span>Based in</span>
            <strong>Addis Ababa, ET</strong>
          </div>
          <div>
            <span>Focus</span>
            <strong>full stack web development</strong>
          </div>
          <div>
            <span>Tools</span>
            <strong>React / Express / Next / JS /TS/ CSS</strong>
          </div>
        </div>
      </div>
    </main>
  )
}
export default About