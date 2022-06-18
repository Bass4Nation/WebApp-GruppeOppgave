import { useEffect } from 'react'

import { createUser } from '@/lib/utils/api'

const Start = () => {
  useEffect(() => {
    createUser()
  }, [])

  return (
    <div className="start">
      <h1>Velkommen til Master Mind</h1>
      <ul>
        <li>
          Spillet går ut på at den ene spilleren bruker farvete brikker for å
          sette opp en skjult kombinasjon (kode), som den andre spilleren skal
          forsøke å gjette.
        </li>
        <li>
          Etter hver gjetning får spilleren et antall små sorte og hvite pinner
          ved siden av koden han/hun gjettet på. Pinnene viser hvor mange
          brikker som er av riktig farve på riktig plass (sorte pinner), og hvor
          mange brikker som er av riktig farve, men er feil plassert (hvite
          pinner).
        </li>
        <li>NB: Det er kun lov å bruke en av hver farge</li>
        <li>
          Det er selvsagt om å gjøre å gjette koden ved å bruke færrest mulig
          forsøk.
        </li>
      </ul>
    </div>
  )
}

export default Start
