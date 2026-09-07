
import profileImage from '../images/image1.png'

function Home() {
  return (
    <main className='home page-content'>
      <section className='hero'><div className='hero-copy'><p className='eyebrow'>Full stack developer / problem solver</p><h1>Building digital experiences that <em>feel clear.</em></h1><p className='hero-intro'>I&apos;m Getachew Dargie, a developer who turns complex ideas into useful, considered products for the web.</p><div className='hero-actions'><a className='button button-dark' href="mailto:getachewdargie3721@gmail.com">Let&apos;s work together <span>↗</span></a><a className='text-link' href="/projects">See selected work <span>→</span></a></div></div><div className='profile-art'><img className='profile-image' src={profileImage} alt='Getachew Dargie' /><div className='profile-caption'><span>01</span><span>Designing with intent</span></div></div></section>
      <section className='home-strip'><p>Currently open to thoughtful collaborations</p><div className='strip-tags'><span>React</span><span>JavaScript</span><span>UI systems</span></div></section>
      <section className='selected-preview'><div className='section-heading'><p className='eyebrow'>A small selection</p><a className='text-link' href="/projects">View all work →</a></div><div className='preview-grid'><article><span className='project-number'>01</span><h2>Tools that make work lighter.</h2><p>Interfaces for people who care about the details.</p></article><article><span className='project-number'>02</span><h2>Ideas made tangible.</h2><p>From first sketch to a fast, accessible frontend.</p></article></div></section>
    </main>
  )
}

export default Home