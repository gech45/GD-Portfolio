import '../styles/Contact.css'

function SocialIcon({ name }) {
  if (name === 'github') {
    return <svg className='social-icon' viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.59 2.35 1.13 2.92.86.09-.67.35-1.13.64-1.39-2.22-.26-4.56-1.15-4.56-5.06 0-1.12.39-2.03 1.02-2.75-.1-.26-.44-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 9.08c.85 0 1.71.12 2.51.37 1.91-1.33 2.75-1.05 2.75-1.05.54 1.41.2 2.45.1 2.71.63.72 1.02 1.63 1.02 2.75 0 3.92-2.35 4.8-4.58 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z' /></svg>
  }

  if (name === 'linkedin') {
    return <svg className='social-icon' viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M5.1 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.3 9h3.6v11.5H3.3V9Zm5.8 0h3.4v1.57h.05c.47-.9 1.62-1.85 3.34-1.85 3.57 0 4.23 2.35 4.23 5.4v6.38h-3.55v-5.65c0-1.35-.03-3.08-1.88-3.08-1.88 0-2.17 1.47-2.17 2.98v5.75H9.1V9Z' /></svg>
  }

  if (name === 'telegram') {
    return <svg className='social-icon' viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='m21.7 4.2-3.1 15.1c-.23 1.07-.85 1.34-1.72.84l-4.74-3.5-2.29 2.2c-.25.25-.46.46-.94.46l.34-4.82 8.77-7.92c.38-.34-.08-.53-.59-.19L6.59 12.9l-4.65-1.46c-1.01-.32-1.03-1.02.21-1.51L20.32 3.4c.86-.32 1.61.2 1.38.8Z' /></svg>
  }

  return <svg className='social-icon' viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M6.6 2.5 9.2 2l2.1 5.1-2.3 1.8a14.4 14.4 0 0 0 6.1 6.1l1.8-2.3 5.1 2.1-.5 2.6c-.2 1.1-1.2 1.9-2.3 1.8C10.3 18.5 5.5 13.7 4.8 4.8c-.1-1.1.7-2.1 1.8-2.3Z' /></svg>
}

function ContactMe() {
  return (
    <main className='page-content inner-page contact-page'>
      
      <h1 className="">Have a project in mind?</h1>
      <p className='lead'>Tell me a little about what you are building, what is getting in the way, or what you are curious about.</p>
      <a className='contact-email' href="mailto:getachewdargie3721@gmail.com">
        getachewdargie3721@gmail.com <span>↗</span>
      </a>
      <div className='contact-links'>
        <a href="https://github.com/gech45" target="_blank" rel="noreferrer"><SocialIcon name='github' />GitHub ↗</a>
        <a href="https://www.linkedin.com/in/getachew-dargie-4982a436/" target="_blank" rel="noreferrer"><SocialIcon name='linkedin' />LinkedIn ↗</a>
        <a href="https://t.me/WAK1331" target="_blank" rel="noreferrer">
          <SocialIcon name='telegram' />Telegram ↗
        </a>
        <a href="tel:+251960344086">
          <SocialIcon name='phone' />+251 960 344 086
        </a>
      </div>
    </main>
  )
}
export default ContactMe