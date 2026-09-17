
import profileImage from '../images/image1.png'
import '../styles/Home.css'

function Home() {
  return (
    <main className='home page-content'>
      <section className='hero'><div className='hero-copy'>
        <p className='eyebrow home-eyebrow'>Hello, I&apos;m</p>
        <h1>Getachew <em>Dargie</em></h1>
        <p className='home-role'>Full-Stack Developer</p>
        <p className='hero-intro'>I build modern, responsive, and reliable web applications from frontend to backend. I enjoy solving problems, writing thoughtful code, and creating products that people can actually use.</p>
      <div className='hero-actions'><a className='button button-dark' href="mailto:getachewdargie3721@gmail.com">Let&apos;s work together <span>↗</span></a><a className='text-link' href="/projects">See selected work <span>→</span></a></div></div><div className='profile-art'><img className='profile-image' src={profileImage} alt='Getachew Dargie' /><div className='profile-caption'><span>01</span><span>Designing with intent</span></div></div></section>
      <section className='home-strip'><p>Currently open to thoughtful collaborations</p><div className='strip-tags'><span>React</span><span>JavaScript</span><span>UI systems</span></div></section>
     
    </main>
  )
}

export default Home