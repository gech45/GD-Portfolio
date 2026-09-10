function About() {
  return (
    <main className='page-content inner-page about-page'>
      <p className='eyebrow'>A little context</p>
      <h1>Curious by nature,<br /><em>careful by craft.</em></h1>

      <div className='about-layout'>
        <p className='lead'>I am a full stack developer focused on making the web more useful, human, and enjoyable to use in a proper time duration. I like clean systems, honest communication, and the moment an idea finally clicks into place.</p>

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