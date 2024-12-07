import { useState } from 'react'
import './App.css'
import { texts } from './texts'

type Language = 'en' | 'es'
function App() {
  const [language, setLanguage] = useState<Language>('en')

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language)
  }

  const t = texts[language]

  return (
    <main>
      <header>
        <div className="language-selector">
          <label htmlFor="language">Lang: </label>
          <select id="language" value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        <h1>{t.title}</h1>

        <a
          href="downloadable/Inputs_Overlay"
          download
          className="download-button"
          aria-label={t.download}
        >
          {t.download}
        </a>
        <span>{t.platform}</span>

        <p className="download-warning">⚠️ {t.downloadWarning}</p>
        <p className="source-code-link">
          {t.souceCode}{' '}
          <a
            href="https://github.com/Federico-Pena/kym-overlay"
            target="_blank"
            rel="noreferrer"
            aria-label={'https://github.com/Federico-Pena/kym-overlay'}
          >
            Github
          </a>
        </p>
      </header>

      <section>
        <img
          title="KyM Overlay"
          className="hero-image"
          src="demo.gif"
          alt="Gif de teclado y ratón en pantalla que resalta visualmente las interacciones del usuario"
        />

        <h2>{t.featuresTitle}</h2>
        <ul>
          {t.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t.whyTitle}</h2>
        <p>{t.whyText}</p>
      </section>

      <footer>
        <p>
          {t.contact} <a href="mailto:federpena22@gmail.com">federpena22@gmail.com</a>.
        </p>
      </footer>
    </main>
  )
}

export default App
